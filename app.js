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

module.exports = app;
