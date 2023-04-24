const mongoose = require("mongoose");
// const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    // default: shortId.generate,
  },
  clicks: {
    required: true,
    default: 0,
    type: Number,
  },
});

module.exports = mongoose.model("ShortUrlEncoder", shortUrlSchema);
