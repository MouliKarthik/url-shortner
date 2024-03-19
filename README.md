
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

```bash
The user details are stored in the users collection under urlshortner database
The user schema
  {
    email:"",
    password: hashedPassword,
    urls: array["containing the id of url"]
  }
```


```bash
The url details are stored in the urls collection under urlshortner database
The url schema
    { url:"",
      shortUrl:"which is retrieved by shortid package",
      validUntil:"which is calclated when the url is add to the database",
      creator:"which is passed in the url",
      clickedFrom:{
          "mobile":"which is calculated by value sent by request header user agent",
          "pc":"which is calculated by value sent by request header user agent"
        },
      "createdAt":
    }
```


```bash
localhost:3000/signup
  This route helps the user to signup. On successfull signup the user gets the id and token as a response
```

```bash
localhost:3000/login
  This route is used for the logging in the user. On the successfull login the user gets the id and token as a response
```

```bash
Post route:
localhost:3000/shorturl/:userId
  This route is used to stored the urls in the database and expiration date is calculated manually.
    we can also set request header for bearer token to authorize the user(Not implemented)
Get route:
localhost:3000/shorturl/:userId
  This route is used to fetch the all urls given by the particular userId.
  we can also set request header for bearer token to authorize the user (Not implemented)
```
```bash
Get route:
localhost:3000/shorturl/:userId/:shorturl
  when this route is entered it redirect the original url.
  when this route is reached request.user-agent is accessed to check whether the url clicked from mobile or pc and simulataneously the count of the mobile/pc is increased
  Also it check the shorturl is valid or not by expiration date in database if it is expired it delete the url from the database
  (Not implemented)we can also set the request header for beared token to authorize the use to avoid lengthy route can be shirnk into => localhost:3000/shorturl/:shorturl
```


