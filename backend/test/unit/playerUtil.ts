import chai = require("chai");
import "mocha";
import Player, {IPlayer} from "../../src/database/player";
import playerUtil from "../../src/utility/playerUtil";

const assert = chai.assert;

describe("playerUtil", () => {

    describe("isValid", () => {
        it("returns true for valid player data", (done) => {
            const player: IPlayer = new Player();
            player.email = "EMAIL@DOMAIN.COM";
            player.name = "NAME";
            assert.equal(playerUtil.isValid(player), true);
            done();
        });

        it("returns false for invalid player data", (done) => {
            const player: IPlayer = new Player();
            player.email = "EMAIL@";
            player.name = "NA";
            assert.equal(playerUtil.isValid(player), false);
            done();
        });
    });
});
