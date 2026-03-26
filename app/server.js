/*
simple node.js service for project
work:
- connect to MongoDB
- gives apples quantity back
- basic HTML response
*/
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017";
const DB_NAME = process.env.DB_NAME || "fruitdb";
const COLLECTION_NAME = process.env.COLLECTION_NAME || "inventory";

let db;

async function connectToMongoWithRetry(retries = 10, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Connecting to MongoDB (attempt ${attempt}/${retries})`);

      const client = new MongoClient(MONGO_URL);
      await client.connect();

      db = client.db(DB_NAME);

      await db.command({ ping: 1 });

      console.log("MongoDB connection established");
      return;

    } catch (err) {
      console.error("MongoDB connection failed:", err.message);

      if (attempt === retries) {
        throw err;
      }

      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

app.get("/", async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);

    const apples = await collection.findOne({ name: "apples" });

    if (!apples) {
      return res.status(404).send("Apples document not found");
    }

    res.send(`
      <html>
        <head>
          <title>Fruit App</title>
        </head>
        <body>
          <h1>Hello World</h1>
          <p>Number of apples in database: ${apples.qty}</p>
        </body>
      </html>
    `);

  } catch (err) {
    console.error("Error fetching apples:", err.message);
    res.status(500).send("Internal server error");
  }
});

app.get("/health", async (req, res) => {
  try {
    await db.command({ ping: 1 });

    res.json({ status: "ok" });

  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

async function startServer() {
  try {
    await connectToMongoWithRetry();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start application:", err.message);
    process.exit(1);
  }
}

startServer();
