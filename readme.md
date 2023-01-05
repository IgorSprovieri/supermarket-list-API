# Supermarket list API

API in node.js with express and mongoose to connect mongoDB database

The main objective is to make life easier for people that go to supermarket. Using the application you no more forget what you need to buy.

## Production app:

To acess the final API, use the link:

```
https://supermarket-list-cloud-api.herokuapp.com
```

The application was deployed using Heroku and MongoDB Atlas

## Used technologies

- Node.js
- Express
- Mongoose
- MongoDB
- Docker
- Nodemon

## Required technologies

- Node.js (https://nodejs.org/en/)
- Docker (https://www.docker.com)
- MongoDB Compass (https://www.mongodb.com/products/compass)

## Steps to run the project

1- Clone the repository:

```
git clone https://github.com/IgorSprovieri/supermarket-list-API
```

2- Create DB on docker:

```
docker run --name supermarket-list -p 27017:27017 -d mongo
```

3- Open the mongoDB compass and add DB:

```
http://localhost:27017
```

4- Navigate to the repository:

```
cd supermarket-list-API
```

5- Install the dependencies:

```
npm install
```

6 - Create .env following example:

```
PORT=3333
DATABASE_URL=mongodb://localhost:27017
```

7- Run the API:

```
npm run start
```

8- Run the API on dev mode:

```
npm run start:dev
```

## Importante rule

Is necessary send the username at the requisition header

## Available endpoints

- [GET]/items
- [POST]/item
- [PUT]/item/:id
- [DELETE]/item/:id

### Testing endpoints with insomnia

1. Download and install insomnia:

```
https://insomnia.rest/download
```

2. Import the json on insomnia

```
supermarket-list-API/insomnia.json
```
