import {Request} from "express";
import GameSession, {IGameSession} from "../database/gameSession";

const NAME_MIN_LENGTH = 3;

export default class GameSessionUtil {
    public static isValid(gameSession: IGameSession) {
        return gameSession.name &&
            gameSession.name.length > NAME_MIN_LENGTH &&
            gameSession.players_id &&
            Array.isArray(gameSession.players_id);
    }

    public static getGameSession(request: Request): IGameSession {
        const gameSession: IGameSession = new GameSession();
        try {
            if (!request.body.name) {
                throw new Error();
            }
            if (!request.body.players) {
                throw new Error();
            }
            gameSession.name = request.body.name;
            gameSession.players_id = request.body.players;
            return gameSession;
        } catch (e) {
            return gameSession;
        }
    }

    public static getFeedback(request: Request){
        let feedback: any = null;
        try {
            if (!request.body.message) {
                throw new Error();
            }
            if (!request.body.playerId) {
                throw new Error();
            }
            if (!request.body.rate) {
                throw new Error();
            }
            feedback = {};
            feedback.message = request.body.message;
            feedback.player_id = request.body.playerId;
            feedback.rate = request.body.rate;
            return feedback;
        } catch (e) {
            return feedback;
        }
    }

    public static toHttp(gameSession: IGameSession | null) {
        if (!gameSession) {
            return {};
        }
        return {
            feedbacks: gameSession.feedbacks,
            id: gameSession.id,
            name: gameSession.name,
            players: gameSession.players_id,
            totalFeedback: gameSession.total_feedback,
            totalRate: gameSession.total_rate,
        };
    }
}
