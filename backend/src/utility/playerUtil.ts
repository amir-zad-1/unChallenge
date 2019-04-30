import {Request} from "express";
import Player, {IPlayer} from "../database/player";

const NAME_MIN_LENGTH = 3;
const EMAIL_MIN_LENGTH = 5;

export default class PlayerUtil {
    public static isValid(player: IPlayer) {
        return player.name &&
            player.name.length > NAME_MIN_LENGTH &&
            player.email &&
            player.email.length > EMAIL_MIN_LENGTH; // todo: use validator package to validate player
    }

    public static getPlayer(request: Request): IPlayer {
        const player: IPlayer = new Player();
        try {
            if (!request.body.name) {
                throw new Error();
            }
            if (!request.body.email) {
                throw new Error();
            }
            player.name = request.body.name;
            player.email = request.body.email;
            return player;
        } catch (e) {
            return player;
        }
    }

    public static toHttp(player: IPlayer) {
        return {
            email: player.email,
            id: player.id,
            name: player.name,
        };
    }
}
