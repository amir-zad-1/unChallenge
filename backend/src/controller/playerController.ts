import {Request, Response} from "express";

class PlayerController {
    public static getHandler(request: Request, response: Response): void {
        response.json([]);
    }

    public static postHandler(request: Request, response: Response): void {
        response.json({newPlayer: true});
    }
}

export default PlayerController;
