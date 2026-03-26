# Octopus DevOps Home Assignment:

## Overview
this project provisions simple web appliction based on node.js and MONGODB 
the application displays a basic html page that return the number of apples in the DB.

## Architecture:
project includes:
- node.js web application
- mongodb database
- docker-compose for provisioning and orchestration
- mongodb initialization script for auto data seeding

each component runs in its own container.
(instead of visual architecture there are more notes about the architecture and additional information in /docs/architecture.md in the original path of the project)

## Project structure:
--app/
  -Dockerfile
  -.dockerignore
  -package.json
  -package-lock.json
  -server.js
--mongo-init/
  -init.js
--docs/
  -architecture.md
--.gitignore
--docker-compose.yml
--Makefile
--README.md

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
start - make up
stop - make down
remove containers and volumes - make reset
via logs - make logs
docker ps - make ps

## Provisioning Notes
The MongoDB seed data is automatically loaded from mongo-init/init.js
The seed script runs during the initial database startup


