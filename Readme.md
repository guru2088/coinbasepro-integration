
# Coinbase Pro Integration

The following is the repository of the Coinbase Pro Integration
The problem statement is defined with the following file as follows.


># 1. Getting Started

- Clone this repository into the machine you want to run this application
- Install the dependencies using NPM
- Run the application using docker / using npm run start
- Start an local mongodb endpoint for this application

### 1.1 Installing Socket

Follow the steps as below to get the application up and running

```
$ cd socket
```
- Install the dependencies using the following command
```
Setup Env Variables
```
- KEY=xxxxxx
- SECRET=xxxxxx
- PASSPHRASE=xxxxxx
- DB_URL=mongodb://xxxxxx:xxxxxx
- DB_NAME=xxxxxx
- COLL_NAME=xxxxxx

```
$ npm install
```
- Use the following command to start the application
```
$ npm run start
```


### 1.2 Installing Server

Follow the steps as below to get the application up and running

```
$ cd server
```
- Install the dependencies using the following command
```
Setup Env Variables
```
- MONGO_HOST=xxxxxx
- MONGO_PORT=xxxxxx

```
$ npm install
```
- Use the following command to start the application
```
$ npm run start
```


### 1.3 Installing Client

Follow the steps as below to get the application up and running
```
$ cd client
```
- Install the dependencies using the following command
```
Setup Env Variables
```
- MONGO_HOST=xxxxxx
- MONGO_PORT=xxxxxx

```
$ npm install
```
- Use the following command to start the application
```
$ npm run start
```

># 2. Tests in the system

The following tests are included in the system
- Unit testing : Jest
- Testing code coverage : Jest-coverage
- API contract testing : Newman
- Lint tests : eslint

### 2.1 - Unit testing:
- Jest is used as the unit testing framework
- All the files types :
    1. Controllers
    2. Services
    3. Helper
    files are unit tested to give cover all the methods and edge cases.


### 2.2 - Testing code coverage
- To be Updated


### 2.3 - API contract testing
- To be Updated

### 2.4 - Lint tests:
- To be Updated

## 2.5 - PreHook Tests
- To be Updated

># 3. CI / CD Strategies
### 3.1 - Gitlab
- The project has a sample jenkins configuration file which could include the following actions:
    1. Obtaining the latest code from the source control
    2. Pushing packages to artifactory
    3. Running the test cases on the application
    4. Running integration tests on the application
    5. Checking for quality, vulnerabilities with SonarQube
    6. Building the docker image to push to image repository
    7. Pushing the docker image to Open shift or any server



># 5. Enhancements:
### Automatic Swagger Generator
- This will help in uniform development of the APIs

### Converting Code to React Redux format
- This will help in more vast and data handling

### Global error handler
- This will help in bubbling any error in the application to be handled by a common method
- This makes centralized logging of errors and tracing of the error flow easier

### Sentry integration
- Building up on the global error handler, Integration to services like Sentry will give us real time metrics on errors and other events happening in the application

### More hooks
- Adding more hooks with git will help enhance quality of code
- It also helps in catching errors / inconsistencies early in the development cycle

### Global error constants
- Global error constants help in uniformity of code
- It also helps in debugging issues faster


## Built With

* [Express JS](https://expressjs.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Jest](https://jestjs.io/) - Unit testing Framework
* [Postman](https://www.postman.com/) - API Testing


## Authors
* **Gururajan**  - [Github](https://github.com/guru2088)

## License
This project is licensed under the MIT License.
