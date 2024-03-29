import BodyParser from "body-parser";
import {Application, Request, Response, NextFunction} from "express";
import express = require("express");
import Log4js from "log4js";

import GameSessionRouter from "./router/gameSessionRouter";
import PlayerRouter from "./router/playerRouter";
import RootRouter from "./router/rootRouter";

const logger = Log4js.getLogger(module.filename);
logger.level = "debug";

class AppManager {
    private static defaultErrorHandler(request: Request, response: Response): any {
        return response.status(500).send("Something went wrong!");
    }

    public app: Application;

    public constructor() {
        this.app = express();
        this.initialize();
        this.setRoutes();
        this.setDefaultErrorHandler();
    }

    private initialize(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(BodyParser.urlencoded({extended: false}));
        this.app.use(BodyParser.json());
        this.app.use((request: Request, response: Response, next: NextFunction) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

    }

    private setRoutes(): void {
        this.app.use("/", RootRouter.getRouter());
        this.app.use("/gamesessions", GameSessionRouter.getRouter());
        this.app.use("/players", PlayerRouter.getRouter());
    }

    private setDefaultErrorHandler(): void {
        this.app.use(AppManager.defaultErrorHandler);
    }
}

const app: Application = new AppManager().app;

export const createApp = () => {
    return app;
};