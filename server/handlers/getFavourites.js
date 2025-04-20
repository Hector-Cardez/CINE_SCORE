"use strict";

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;
let client;

// Connect to MongoDB
const connectToMongo = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client.db("FavMovies"); // Database name
};

// Static userId handled by backend
const userId = "e62a17e5-9c48-4a71-b7d8-1e2e7c6fcf3d";

const getFavourites = async (req, res) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection("favourites");

    // Fetch the favourites for the given userId
    const userFavourites = await collection.findOne({ userId });

    if (!userFavourites) {
      return res.status(404).json({
        status: 404,
        message: "No favourites found for this user",
        favourites: [],
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Favourites retrieved successfully",
      favourites: userFavourites.favourites, // The favourites array
    });
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

module.exports = getFavourites;
