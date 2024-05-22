const express = require("express");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactions");
const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.DB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use("/api", transactionRoutes);

module.exports = app;
