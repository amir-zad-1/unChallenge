Unity Challenge - Backend

1. [Nodejs](https://nodejs.org/en/)
2. [TypeScript](http://www.typescriptlang.org/)
3. [ExpressJs](https://expressjs.com/)
4. [Mocha](https://mochajs.org/)
5. [Mongo](https://www.mongodb.com/)
6. [Mongoose](https://mongoosejs.com/)

#### Endpoints
     1. /healthcheck
             1.1 [GET] => returns {ok: true} if service is up.

#### Run 
 Note: Requires node.js and npm to be installed.
 Note: [Start the database first.](https://github.com/hypBox/unChallenge/tree/master/db)

    npm i
    npm run build
    npm start
    curl http://localhost:3000/healthcheck

### Test
#### Unit Tests
     cd [root directory of repository]
     npm run utest

#### Integration Tests
     cd [root directory of repository]
     npm start&
     npm run itest
##### Unit Tests Result
 
![Test Results](/backend/test/utest.png?raw=true "Unit Test Results")

##### Integration Tests Result
 
![Test Results](/backend/test/itest.png?raw=true "Integration Test Results")