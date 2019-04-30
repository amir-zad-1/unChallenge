import moment = require("moment");
import mongoose from "mongoose";

const dt = mongoose.Schema.Types;

export interface IFeedback extends mongoose.Document {
    created: Date;
    message: string;
    rate: number;
    player_id: string;
}

export interface IGameSession extends mongoose.Document {
    created: Date;
    name: string;
    players_id: string[];
    feedbacks: IFeedback[];
    totalFeedback: number;
    totalRate: number;
}

export const feedbackSchema = new mongoose.Schema({
    created: {
        default: moment.now(),
        type: dt.Date,
    },
    message: {type: dt.String, required: true},
    player_id: dt.ObjectId,
    rate: {type: dt.Number, default: 0},
});

export const gameSessionSchema = new mongoose.Schema({
    created: {
        default: moment.now(),
        type: dt.Date,
    },
    name: {type: dt.String, required: true},
    players_id: {
        default: [],
        type: [dt.ObjectId],
    },
    feedbacks: {
        default: [],
        type: [feedbackSchema],
    },
    total_rate: {
        default: 0,
        type: dt.Number,
    },
    total_feedback: {
        default: 0,
        type: dt.Number,
    },
});

const GameSession = mongoose.model<IGameSession>("GameSession", gameSessionSchema);
export default GameSession;
