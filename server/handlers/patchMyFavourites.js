"use strict";

const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
let client;

//  connect to MongoDB
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

const patchMyFavourites = async (req, res) => {
  try {
    const { userId, favourites } = req.body;

    if (!userId || !favourites) {
      return res.status(400).json({
        status: 400,
        message: "User ID and favourites data are required",
      });
    }

    const db = await connectToMongo();

    const collection = db.collection("favourites");

    const result = await collection.updateOne(
      { userId },
      { $set: { favourites } },
      { upsert: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Favourites updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating favourites:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

module.exports = patchMyFavourites;
