const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl");

router.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  return res.status(200).send(shortUrls);
});

router.post("/", async (req, res) => {
  let shortUrl = new ShortUrl({
    full: req.body.longUrl,
    short: req.body.shortUrl,
  });

  shortUrl = await shortUrl.save();
  return res.status(200).send(shortUrl);
});

router.get("/:id", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({_id: req.params.id});
  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks++;

  shortUrl.save();

  const data = await ShortUrl.find()

  return res.status(200).send(data);
});

module.exports = router;
