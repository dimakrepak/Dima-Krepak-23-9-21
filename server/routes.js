const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router
  .get("/autocomplete", async (req, res) => {
    const { q } = req.query;
    try {
      if (q) {
        const response = await axios({
          method: "GET",
          url: "https://dataservice.accuweather.com/locations/v1/cities/autocomplete",
          params: {
            apikey: process.env.API_KEY,
            q: q,
          },
        });
        res.status(200).send(response.data);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .get("/weather/:locationKey", async (req, res) => {
    const { locationKey } = req.params;
    const { type } = req.query;
    try {
      if (locationKey) {
        const currentConditions = await axios({
          method: "GET",
          url:
            "http://dataservice.accuweather.com/currentconditions/v1/" +
            locationKey,
          params: {
            apikey: process.env.API_KEY,
          },
        });

        const dailyForecasts = await axios({
          method: "GET",
          url:
            "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
            locationKey,
          params: {
            apikey: process.env.API_KEY,
          },
        });
        const location = await axios({
          method: "GET",
          url: "http://dataservice.accuweather.com/locations/v1/" + locationKey,
          params: {
            apikey: process.env.API_KEY,
          },
        });
        if (type === "current") {
          res.status(200).send({
            currentConditions: currentConditions?.data[0],
            location: location?.data,
          });
        } else if (type === "all") {
          res.status(200).send({
            dailyForecasts: dailyForecasts?.data,
            currentConditions: currentConditions?.data[0],
            location: location?.data,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
module.exports = router;
