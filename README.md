
# EU TOP 5 API
Simple API for [eu-top-five](https://github.com/d3niSlav/eu-top-five) client app.

## Prerequisite
For the Database you will need a PostgreSQL DB setup.

You can use a local instance or the Docker file in the project.

Steps to use the Docker image for PostgreSQL:
1. Create a `.env` file for the docker compose. You can use the example one from the repository
2. Run
```bash
docker-compose up -d
```
3. Get the container name running `docker ps` and look for the docker image
4. Enter the container using this command:
```bash
winpty docker exec -it <container_name> bash
```
5. Connect to a PostgreSQL Database Server:
```bash
psql -h localhost -U <name>
```
6. Create a DB inside the docker db
```bash
CREATE DATABASE "eu-top-five-db";
```
7. Confirm Database creation
```bash
\l
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript API to handle user authentication, creation and favorite teams for the client app [eu-top-five](https://github.com/d3niSlav/eu-top-five).

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
