const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    director: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const MovieModel = mongoose.model("movie", moviesSchema);

module.exports = MovieModel;
