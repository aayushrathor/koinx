# Koinx Crypto 

## Description
A Server Side Application to fetch Crypto Transactions of a user

## Project Structure
```bash
.
├── assests
├── logs
│   └── server.log
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── config
    │   └── koinx.mongo.js
    ├── controller
    │   ├── ethereum.controller.js
    │   └── koinx.controller.js
    ├── index.js
    ├── route
    │   └── koinx.route.js
    └── utils
        └── koinx.logger.js
```

## Installation
```bash
# clone the repository
$ git clone https://github.com/aayushrathor/koinx.git koinx && cd koinx

# install dependencies
$ npm install
```

## Usage
```bash
# start the server in development mode
$ npm run start:dev

# start the server
$ npm run start:prod

# use docker
$ docker compose up -d
```

## API Endpoints
```bash
# Get Transactions by Address
GET /api/transactions/:id

# Get Balance and ethereum rate by Address
GET /api/fetch/:id
```

## Usage Video
![Usage Video](https://youtu.be/lZRQrFHI67w)
