require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

const app = express();

mongoose.connect(MONGOURL).then(() => {
  console.log("Database successfully connected");
});
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`runs on ${PORT}`);
  console.log(MONGOURL);
});
