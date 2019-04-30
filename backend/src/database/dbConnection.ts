import mongoose from "mongoose";
import Config from "../config";

export const connect = () => mongoose.connect(`mongodb://${Config.db.server}/${Config.db.db}`,
    {useNewUrlParser: true});
