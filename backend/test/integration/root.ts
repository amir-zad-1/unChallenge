import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);

import config from "../../src/config";

const assert = chai.assert;

const API_URL = `http://localhost:${config.server.port}`;

describe("/healthcheck", () => {

    it("GET returns ok equals true", (done) => {
        chai.request(API_URL).get("/").end((error, response) => {
            if (error) {
                return done(error);
            }
            assert.equal(response.body.ok, true);
            done();
        });
    });
});
