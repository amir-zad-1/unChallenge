import {Router} from "express";
import GameSessionController from "../controller/gameSessionController";

class GameSessionRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    public getRouter(): Router {
        this.router.get("/", GameSessionController.getHandler);
        return this.router;
    }
}

export default new GameSessionRouter();
