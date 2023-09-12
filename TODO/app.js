const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user");
const Trouter = require("./routes/task");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { errorMiddelware } = require("./middelware/error");

dotenv.config(); // Corrected configuration path

const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["FRONTEND ULR"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/users", router);
app.use("/api/v1/task", Trouter);

app.get("/", (req, res) => {
  res.send("nice working");
});

// app.use(errorMiddelware);

module.exports = app;
