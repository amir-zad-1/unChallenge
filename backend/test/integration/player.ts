import chai = require("chai");
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);

import config from "../../src/config";

const assert = chai.assert;

const API_URL = `http://localhost:${config.server.port}/players`;

describe("/players", () => {

    it("GET returns 200 and list of players", (done) => {
        chai.request(API_URL).get("/").end((error, response) => {
            if (error) {
                return done(error);
            }
            assert.equal(Array.isArray(response.body), true);
            assert.equal(response.status, 200);
            done();
        });
    });

    it("POST returns 201 for valid player data", (done) => {
        const postData = {
            email: "EMAIL@DOMAIN.COM",
            name: "NAME",
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

    it("POST returns 400 for invalid player data", (done) => {
        const postData = {
            email: "EMAIL@DOMAIN.COM",
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
