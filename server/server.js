const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const urlShortener = require("./routes/urlShortener");

require("./startups/logging");

mongoose
  .connect("mongodb://localhost/URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(new Error(e)));

// app.use(express.urlencoded({extended: true}));
app.use(express.json());

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use("/api/short", urlShortener);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
