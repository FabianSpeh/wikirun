require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database not connected", err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/wiki/:title", async (req, res) => {
  const title = req.params.title;
  const url = "https://en.wikipedia.org/w/api.php";
  const params = {
    action: "parse",
    page: title,
    format: "json",
    prop: "text",
    disablelimitreport: "1",
    disableeditsection: "1",
    disabletoc: "1",
  };
  try {
    const response = await axios.get(url, { params });
    const htmlContent = response.data.parse.text["*"];
    res.json({ html: htmlContent });
  } catch (error) {
    console.error("Error fetching Wikipedia page:", error);
    res.status(500).send("Error fetching Wikipedia page");
  }
});

app.use("/", require("./routes/authRoutes"));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
