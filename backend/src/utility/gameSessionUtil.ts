// import {Request} from "express";

import {IGameSession} from "../database/gameSession";

export default class GameSessionUtil {
    // public static isValid(player: IPlayer) {
    //     return player.name &&
    //         player.name.length > NAME_MIN_LENGTH &&
    //         player.email &&
    //         player.email.length > EMAIL_MIN_LENGTH; // todo: use validator package to validate player
    // }

    // public static getGame(request: Request): IPlayer {
    //     const player: IPlayer = new Player();
    //     try {
    //         if (!request.body.name) {
    //             throw new Error();
    //         }
    //         if (!request.body.email) {
    //             throw new Error();
    //         }
    //         player.name = request.body.name;
    //         player.email = request.body.email;
    //         return player;
    //     } catch (e) {
    //         return player;
    //     }
    // }
    //
    public static toHttp(gameSession: IGameSession) {
        return {
            id: gameSession.id,
            name: gameSession.name,
            totalFeedback: gameSession.totalFeedback,
            totalRate: gameSession.totalRate,
        };
    }
}
