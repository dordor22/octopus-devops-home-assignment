# Architecture Overview

## Components

The application is having docker compose for two main services:

1. **app**
   - Node.js application built with Express
   - Connects to MongoDB
   - Serves a simple HTML page with the number of apples in the database as requested 

2. **mongo**
   - MongoDB database
   - Initialized automatically diring first startup

## Network Flow

- The `app` service communicates with the `mongo` service over the internal docker-compose network
- MongoDB is reachable from the application using the hostname `mongo:27017`

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



