import {Request, Response} from "express";

class GameSessionController {
    public static getHandler(request: Request, response: Response): void {
        response.json({ok: true});
    }
}

export default GameSessionController;
