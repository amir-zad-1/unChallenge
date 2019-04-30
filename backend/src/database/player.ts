import mongoose from "mongoose";

const dt = mongoose.Schema.Types;

export interface IPlayer extends mongoose.Document {
    name: string;
    email: string;
}

export const playerSchema = new mongoose.Schema({
    email: {type: dt.String, required: true},
    name: {type: dt.String, required: true},
});

const Player = mongoose.model<IPlayer>("Player", playerSchema);
export default Player;
