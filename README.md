# Octopus DevOps Home Assignment:

## Overview
This project contains containerized wep application as part of DevOps home assignment

The application uses:
- Node.js
- MongoDB
- Docker Compose
- nginx

and the appliction returns simple HTML page who display the number of apples in the DB as requested

## Main Features
- Multi container architecture
- Automated provisioning from scratch
- Automatic MongoDB seed data loading
- Reverse proxy layer with nginx
- Healthchecks for MongoDB and application readiness
- Persistent MongoDB storage using docker volumes
- CI validation with GitHub Actions

## Architecture:
- nginx - external entry point
- app - Node.js web application
- mongo - MongoDB database
## Project structure:
```text
--app/
  -Dockerfile
  -.dockerignore
  -package.json
  -package-lock.json
  -server.js
--mongo-init/
  -init.js
--nginx/
  - default.conf
--docs/
  -architecture.md
--.github/
  -workflows/
    -ci.yml
--.gitignore
--docker-compose.yml
--Makefile
--README.md
```
## Application Behavior
the application connects to MongoDB read the apples document from the inventory collection and returns the quantity in simple HTML response
(expected result should be 5 as mentiones in the email with the instructions)

## How To Run:
Clone the REPO from : https://github.com/dordor22/octopus-devops-home-assignment
and then run:
docker compose up --build
or use the Makefile contect for easier commands.
application will be avilable in:
http://localhost:8080
and health endpoint via:
http://localhost:8080/health

## Useful Commands via Makefile
```text
start - make up
stop - make down
remove containers and volumes - make reset
via logs - make logs
docker ps - make ps
```
## Provisioning Notes
The MongoDB seed data is automatically loaded from mongo-init/init.js
The seed script runs during the initial database startup

## CI pipeline
GitHub Actions workflow under:
.github/workflows/ci.yml

The pipeline:
```text
- Build the environment
- Starts the full stack
- Wait for the readiness
- Verify health endpoints
- Verify the homepage contains the correct apples quantity
