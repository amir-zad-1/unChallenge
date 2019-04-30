<<<<<<< HEAD
<<<<<<< Updated upstream
Unity Challenge
=======
=======
>>>>>>> master
# Unity Challenge 

### Services:
1. [Backend](./backend)
2. [Frontend](./frontend)
3. [Database](./db)

### Run Project
 Note: Requires node.js and npm to be installed.

``` bash
    cd [root directory of repository]
    
    chmod +x ./db/rundocker.sh
    ./db/rundocker.sh
    
    cd backend
    npm i
    npm run build
    npm start&
    
    
```
Visit http://localhost:8081

**Note:** 'Add user' feature is not implemented in frontend.
Please send POST request to backend to add a new user.

### Improvements
1. add Docker-Compose to run and manage the entire solution.
2. Use Swagger to document the Backend API.
3. Use Cypress to automate Frontend testing.
4. Improve test coverage.

![Frontend](/img/front.png?raw=true "Frontend")
