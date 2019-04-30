import {Router} from "express";
import PlayerController from "../controller/playerController";

class PlayerRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    public getRouter(): Router {
        this.router.get("/:id?", PlayerController.getHandler);
        this.router.post("/", PlayerController.postHandler);
        return this.router;
    }
}

export default new PlayerRouter();
