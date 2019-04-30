import {Request, Response} from "express";

class PlayerController {
    public static getHandler(request: Request, response: Response): void {
        response.json({players: true});
    }
}

export default PlayerController;
