import chai = require("chai");
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);

import config from "../../src/config";

const assert = chai.assert;

const API_URL = `http://localhost:${config.server.port}/gamesessions`;

describe("/gamesessions", () => {

    it("GET returns 200 and list of game sessions", (done) => {
        chai.request(API_URL).get("/").end((error, response) => {
            if (error) {
                return done(error);
            }
            assert.equal(Array.isArray(response.body), true);
            assert.equal(response.status, 200);
            done();
        });
    });

});
