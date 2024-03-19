
## Description
This project uses next.js
This project is help the user to shorten the url.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```
## About the app
The user details are stored in the users collection under urlshortner database
```bash
localhost:3000/signup
  This route helps the user to signup. On successfull signup the user gets the id and token as a response
```
```bash
localhost:3000/login
  This route is used for the logging in the user. On the successfull login the user gets the id and token as a response
```
