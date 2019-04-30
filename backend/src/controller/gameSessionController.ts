import {Request, Response} from "express";
import Log4js from "log4js";
import {IGameSession} from "../database/gameSession";
import gameSessionService from "../service/gameSessionService";
import gameSessionUtil from "../utility/gameSessionUtil";

const logger = Log4js.getLogger(module.filename);
logger.level = "debug";

class GameSessionController {
    public static getHandler(request: Request, response: Response): void {
        const id: string = request.params.id;
        if (id) {
            gameSessionService.getById(id).then((findGameSession) => {
                if (!findGameSession) {
                    return response.status(404).send();
                }
                response.json(gameSessionUtil.toHttp(findGameSession));
            });
            return;
        }
        gameSessionService.getAll().then((gameSessions) => {
            response.json(gameSessions.map((gameSession) => gameSessionUtil.toHttp(gameSession)));
        }).catch((error) => {
            logger.error(error);
            response.status(500).send();
        });
    }

    public static postHandler(request: Request, response: Response): void {
        const gameSession: IGameSession = gameSessionUtil.getGameSession(request);
        if (!gameSessionUtil.isValid(gameSession)) {
            response.status(400).json({message: "invalid game session data"});
            return;
        }
        gameSessionService.addGameSession(gameSession).then((saveGameSession) => {
            response.status(201).json(gameSessionUtil.toHttp(saveGameSession));
        }).catch((error) => {
            logger.error(error);
            response.status(500).send();
        });
    }

    public static feedbackGetHandler(request: Request, response: Response): void {
        const id: string = request.params.id;
        if (id) {
            gameSessionService.getById(id).then((findGameSession) => {
                if (!findGameSession) {
                    return response.status(404);
                }
                response.json(gameSessionUtil.toHttp(findGameSession).feedbacks);
            });
            return;
        }
    }

    public static feedbackPostHandler(request: Request, response: Response): void {
        const id: string = request.params.id;
        const feedback = gameSessionUtil.getFeedback(request);
        if (!id && !feedback) {
            response.status(400).send();
            return;
        }
        gameSessionService.addFeedback(id, feedback)
            .then(() => response.status(201).send())
            .catch(() => response.status(500).send());

    }
}

export default GameSessionController;
