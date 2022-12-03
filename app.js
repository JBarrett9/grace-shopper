require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

const apiRouter = require("./api");
app.use("/api", apiRouter);
app.use(express.static("client/build"));
app.get("*", (req, res, next) => {
  res.sendFile("./client/build/index.html");
});
module.exports = app;
