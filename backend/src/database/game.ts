import moment = require("moment");
import mongoose from "mongoose";

const dt = mongoose.Schema.Types;

export interface IReview extends mongoose.Document {
    created: Date;
    message: string;
    rate: number;
    player_id: string;
}

export interface IGame extends mongoose.Document {
    created: Date;
    name: string;
    players_id: string[];
    reviews: IReview[];
}

export const reviewSchema = new mongoose.Schema({
    created: {
        default: moment.now(),
        type: dt.Date,
    },
    message: {type: dt.String, required: true},
    player_id: dt.ObjectId,
    rate: {type: dt.Number, default: 0},
});

export const gameSchema = new mongoose.Schema({
    created: {
        default: moment.now(),
        type: dt.Date,
    },
    name: {type: dt.String, required: true},
    players_id: {
        default: [],
        type: [dt.ObjectId],
    },
    reviews: {
        default: [],
        type: [reviewSchema],
    },
});

const Game = mongoose.model<IGame>("Game", gameSchema);
export default Game;
