const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  image: String,
  sold: Boolean,
});

module.exports = mongoose.model("Transaction", transactionSchema);
