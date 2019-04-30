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

    it("POST returns 201 for valid game session data", (done) => {
        const postData = {
            name: "NAME",
            players: ["000000000000000000000000", "111111111111111111111111"],
        };
        chai.request(API_URL).post("/").send(postData).end((error, response) => {
            if (error) {
                return done(error);
            }
            assert.equal(response.body.name, postData.name);
            assert.exists(response.body.id);
            assert.equal(response.status, 201);
            done();
        });
    });

    it("POST returns 400 for invalid game session data", (done) => {
        const postData = {
            name: "NAME",
        };
        chai.request(API_URL).post("/").send(postData).end((error, response) => {
            if (error) {
                return done(error);
            }
            assert.equal(response.status, 400);
            done();
        });
    });

});
