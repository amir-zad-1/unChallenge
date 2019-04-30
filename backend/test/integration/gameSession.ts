import chai = require("chai");
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);

import config from "../../src/config";

const assert = chai.assert;

const API_URL = `http://localhost:${config.server.port}/gamesessions`;
const gameSessionPostData = {
    name: "NAME",
    players: ["000000000000000000000000", "111111111111111111111111"],
};

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
        postGameSession().then((gameSessionResponse: any) => {
            assert.equal(gameSessionResponse.body.name, gameSessionPostData.name);
            assert.exists(gameSessionResponse.body.id);
            assert.equal(gameSessionResponse.body.totalFeedback, 0);
            assert.equal(gameSessionResponse.status, 201);
            done();
        }).catch((error) => done(error));
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

    describe("/:id/feedbacks", () => {
        let gameSession: any;
        before((done) => {
            postGameSession().then((gameSessionResponse: any) => {
                gameSession = gameSessionResponse.body;
                done();
            });
        });
        it("GET returns 200 and empty list of game session feedbacks", (done) => {
            chai.request(API_URL).get(`/${gameSession.id}/feedbacks`).end((error, response) => {
                if (error) {
                    return done(error);
                }
                assert.equal(Array.isArray(response.body), true);
                assert.equal(response.status, 200);
                done();
            });
        });
        //
        //     it("POST returns 201 for feedbacks", (done) => {
        //         assert.equal(Array.isArray(getResponse.body), true);
        //         assert.equal(getResponse.status, 200);
        //         done();
        //     });
    });

});

const postGameSession = () => {
    return new Promise((resolve, reject) => {
        chai.request(API_URL).post("/").send(gameSessionPostData).end((postError, postResponse) => {
            if (postError) {
                return reject(postError);
            }
            resolve({
                body: postResponse.body,
                status: postResponse.status,
            });
        });
    });
};
