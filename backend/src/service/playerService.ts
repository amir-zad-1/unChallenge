import Player, {IPlayer} from "../database/player";

export default class PlayerService {
    public static getAll() {
        return Player.find({});
    }

    public static getById(id: string) {
        return Player.findById(id);
    }

    public static add(player: IPlayer) {
        return player.save();
    }
}
