import GameSession, {IFeedback, IGameSession} from "../database/gameSession";

export default class GameSessionService {
    public static getAll() {
        return GameSession.find({});
    }

    public static getById(id: string) {
        return GameSession.findById(id);
    }

    public static addGameSession(gameSession: IGameSession) {
        return gameSession.save();
    }

    public static addFeedback(gameSessionId: string, feedback: IFeedback) {
        return new Promise((resolve, reject) => {
            GameSession.findById(gameSessionId).then((gameSession) => {
                if (!gameSession) {
                    return reject(new Error("game session not found"));
                }
                const previousFeedbacks = gameSession.feedbacks.filter((f) => f.player_id === f.player_id);
                if (previousFeedbacks.length === 1) {
                    return reject(new Error("feedback existed"));
                }
                gameSession.feedbacks.push(feedback);
                gameSession.save().then((saveGameSession) => resolve(saveGameSession));
            }).catch((error) => reject(error));
        });
    }
}
