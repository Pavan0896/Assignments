const express = require("express");
const MovieModel = require("../Model/movies.model");

const movieRouter = express.Router();

movieRouter.post("/movies", async (req, res) => {
  try {
    let body = req.body;
    let movies = new MovieModel(body);
    await movies.save();
    res.status(200).send("Data received");
  } catch (error) {
    res.status(404).send(`Movie not found. ${error}`);
  }
});

movieRouter.get("/movies", async (req, res) => {
  try {
    let { q } = req.query;
    let { rating } = req.query;
    let movie = await MovieModel.find({
      title: { $regex: `${q}`, $options: "i" },
    });
    let ratings =
      rating == "asc"
        ? await MovieModel.aggregate([{ $match: {} }, { $sort: { rating: 1 } }])
        : rating == "desc"
        ? await MovieModel.aggregate([
            { $match: {} },
            { $sort: { rating: -1 } },
          ])
        : await MovieModel.find({ rating: rating });
    q ? res.status(200).send(movie) : res.status(200).send(ratings);
  } catch (error) {
    res.status(404).send(`Movie not found. ${error}`);
  }
});

module.exports = movieRouter;
