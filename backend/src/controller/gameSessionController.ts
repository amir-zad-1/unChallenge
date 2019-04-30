import {Request, Response} from "express";
import Log4js from "log4js";
import gameSessionService from "../service/gameSessionService";
import gameSessionUtil from "../utility/gameSessionUtil";

const logger = Log4js.getLogger(module.filename);
logger.level = "debug";

class GameSessionController {
    public static getHandler(request: Request, response: Response): void {
        gameSessionService.getAll().then((gameSessions) => {
            response.json(gameSessions.map((gameSession) => gameSessionUtil.toHttp(gameSession)));
        }).catch((error) => {
            logger.error(error);
            response.status(500).send();
        });
    }

    public static postHandler(request: Request, response: Response): void {
        response.json([1, 2, 3]);
    }

    public static feedbackGetHandler(request: Request, response: Response): void {
        response.json(["f1", "f2"]);
    }

    public static feedbackPostHandler(request: Request, response: Response): void {
        response.json({post: true});
    }
}

export default GameSessionController;
