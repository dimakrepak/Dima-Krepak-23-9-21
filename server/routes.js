const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/autocomplete", async (req, res) => {
  const { q } = req.query;
  try {
    if (q) {
      const response = await axios({
        method: "GET",
        url: "https://dataservice.accuweather.com/locations/v1/cities/autocomplete",
        params: {
          apikey: "Cmi0WrqCAdFnuK8GXk37lYQWdaFoAe3F",
          q: q,
        },
      });
      res.status(200).send(response.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
