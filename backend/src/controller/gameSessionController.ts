import {Request, Response} from "express";

class GameSessionController {
    public static getHandler(request: Request, response: Response): void {
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
