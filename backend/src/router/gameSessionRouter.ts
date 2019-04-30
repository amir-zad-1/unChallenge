import {Router} from "express";
import GameSessionController from "../controller/gameSessionController";

class GameSessionRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    public getRouter(): Router {
        this.router.get("/:id/feedbacks", GameSessionController.feedbackGetHandler);
        this.router.post("/:id/feedbacks", GameSessionController.feedbackPostHandler);
        this.router.get("/:id?/", GameSessionController.getHandler);
        return this.router;
    }
}

export default new GameSessionRouter();
