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

    it("GET returns 404 for non-existed game session id", (done) => {
        const notExistedId = "000000000000000000000000";
        chai.request(API_URL).get(`/${notExistedId}`).end((error, response) => {
            if (error) {
                return done(error);
            }
            assert.equal(response.status, 404);
            done();
        });
    });

    it("POST returns 201 for valid game session data", (done) => {
        const gameSessionPostData = {
            name: "NAME",
            players: ["000000000000000000000001", "111111111111111111111110"],
        };
        postGameSession(gameSessionPostData).then((gameSessionResponse: any) => {
            assert.equal(gameSessionResponse.body.name, gameSessionPostData.name);
            assert.exists(gameSessionResponse.body.id);
            assert.equal(gameSessionResponse.body.totalFeedback, 0);
            assert.equal(gameSessionResponse.status, 201);
            done();
        }).catch((error: Error) => done(error));
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
        const gameSessionPostData = {
            name: "NAME",
            players: ["000000000000000000000001", "111111111111111111111110"],
        };
        before((done) => {
            postGameSession(gameSessionPostData).then((gameSessionResponse: any) => {
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

        it("POST returns 201 for feedbacks", (done) => {
            const feedbackPostData = {
                message: "MESSAGE",
                playerId: "111111111111111111111111",
                rate: 3,
            };
            chai.request(API_URL).post(`/${gameSession.id}/feedbacks`).send(feedbackPostData).end((error, response) => {
                if (error) {
                    return done(error);
                }
                assert.equal(response.status, 201);
                done();
            });
        });

        it("POST returns 400 for feedback with rate greater than 5", (done) => {
            const feedbackPostData = {
                message: "MESSAGE",
                playerId: "111111111111111111111119",
                rate: 6,
            };
            chai.request(API_URL).post(`/${gameSession.id}/feedbacks`).send(feedbackPostData).end((error, response) => {
                if (error) {
                    return done(error);
                }
                assert.equal(response.status, 400);
                done();
            });
        });

        it("POST returns 409 for existing feedback", (done) => {
            const feedbackPostData = {
                message: "MESSAGE",
                playerId: "111111111111111111111118",
                rate: 3,
            };
            chai.request(API_URL).post(`/${gameSession.id}/feedbacks`)
                .send(feedbackPostData).end((fError, fResponse) => {
                if (fError) {
                    return done(fError);
                }
                chai.request(API_URL).post(`/${gameSession.id}/feedbacks`)
                    .send(feedbackPostData).end((sError, sResponse) => {
                    assert.equal(sResponse.status, 409);
                    done();
                });
            });
        });
    });

});

const postGameSession = (postData: any) => {
    return new Promise((resolve, reject) => {
        chai.request(API_URL).post("/").send(postData).end((postError, postResponse) => {
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
