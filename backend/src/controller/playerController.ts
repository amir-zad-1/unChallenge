import {Request, Response} from "express";
import {IPlayer} from "../database/player";
import playerUtil from "../utility/playerUtil";
import playerService from "../service/playerService";

class PlayerController {
    public static getHandler(request: Request, response: Response): void {
        response.json([]);
    }

    public static postHandler(request: Request, response: Response): void {
        const player: IPlayer = playerUtil.getPlayer(request);
        if (!playerUtil.isValid(player)) {
            response.status(400).json({message: "invalid player data"});
            return;
        }
        playerService.add(player).then((savePlayer) => {
            response.status(201).json(playerUtil.toHttp(savePlayer));
        });
    }
}

export default PlayerController;
