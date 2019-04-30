import {Request, Response} from "express";
import Log4js from "log4js";
import {IPlayer} from "../database/player";
import playerService from "../service/playerService";
import playerUtil from "../utility/playerUtil";

const logger = Log4js.getLogger(module.filename);
logger.level = "debug";

class PlayerController {
    public static getHandler(request: Request, response: Response): void {
        const id: string = request.params.id;
        if (id) {
            playerService.getById(id).then((foundPlayer) => {
                response.json(playerUtil.toHttp(foundPlayer));
            });
            return;
        }
        playerService.getAll().then((players) => {
            response.json(players.map((player) => playerUtil.toHttp(player)));
        }).catch((error) => {
            logger.error(error);
            response.status(500).send();
        });
    }

    public static postHandler(request: Request, response: Response): void {
        const player: IPlayer = playerUtil.getPlayer(request);
        if (!playerUtil.isValid(player)) {
            response.status(400).json({message: "invalid player data"});
            return;
        }
        playerService.add(player).then((savePlayer) => {
            response.status(201).json(playerUtil.toHttp(savePlayer));
        }).catch((error) => {
            logger.error(error);
            response.status(500).send();
        });
    }
}

export default PlayerController;
