const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactions');

const app = express();

mongoose.connect('mongodb+srv://singhpriyanshu305:RDYHHEW221DX25MV@cluster0.h9ch1pv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

app.use(express.json());
app.use('/api', transactionRoutes);


module.exports = app;
