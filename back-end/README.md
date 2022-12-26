# Back-end
Back-end based on NestJS.

## Configuration
### Local development without Docker
In the back-end root folder, provide a .env file.  
Please have a look at .env-example.

### Docker
When running in Docker, provide the env variables as actual env variables instead of putting them in the .env file.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
