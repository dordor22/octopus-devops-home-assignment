# Architecture Overview

## Components

The application is having docker compose for two main services:
1. **nginx**
   - Entry poing for inconing HTTP traffic
   - acts as a reverse proxy in front of the app

2. **app**
   - Node.js application built with Express
   - Connects to MongoDB
   - Serves a simple HTML page with the number of apples in the database as requested 

3. **mongo**
   - MongoDB database
   - Initialized automatically diring first startup

## Architecture Flow
```text
Client Browser
      |
      v
    nginx
      |
      v
     app
      |
      v
    mongo
```

## Componenets
- NGINX:
Exposes the app on port 8080 on the host
forward incoming requests to the intenal app service
provides clean entry-point
can be extended in future to support load balancing

- APP:
runs the Node.js web service
uses the official MongoDB and Node.js
waiting for MongoDB using retry logic
expose:
- return the HTML page with apples quentity
- /health return health endpoint by Docker healthcheck

-MONGO:
runs on mongodb7
seeds the required dataset automatic using an initalization script
stores persistent data in a named docker volume

## Networking
Docker compose created an internal network for service to service communication:
nginx forward requests to app
app connects to MongoDB using mongo:27017

## Health
the stack included healthchecks for:
mongo- validates MongoDB responsivess using mongosh
app- using the /health endpoint
## Data Flow

1. MongoDB starts
2. Initialization script inserts the required inventory documents
3. The Node.js application connects to MongoDB
4. On request to `/`, the application queries the `apples` document
5. The application returns an HTML response with the apples number

## Persistent Storage

MongoDB uses a named volume:

- `mongo_data`

This ensures the database data persists across container restarts.

## CI
the ci pipeline peform the following items:
- build the stack
- start all services with docker compose
- waits for all the application health endpoints to be avilable
- verifies that the HTML page contains the expected apples quantity
- shut the environment down
