"use strict";

const { getImages } = require("../dbimport");

const imagesRoute = async (req, res) => {
  try {
    const { movieId } = req.params;
    const images = await getImages(movieId);
    res.json(images);
  } catch (error) {
    console.error("Error fetching images for movie:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

module.exports = imagesRoute;
