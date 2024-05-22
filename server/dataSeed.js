const mongoose = require('mongoose');
const axios = require('axios');
const Transaction = require('./models/Transaction');

mongoose.connect('mongodb+srv://singhpriyanshu305:RDYHHEW221DX25MV@cluster0.h9ch1pv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');

  const initializeDatabase = async () => {
    try {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const transactions = response.data;

      await Transaction.insertMany(transactions);
      console.log('Database initialized with seed data');

      mongoose.connection.close();
    } catch (error) {
      console.error('Error initializing database:', error);
      mongoose.connection.close();
    }
  };

  initializeDatabase();
}).catch(err => {
  console.error('Database connection error:', err);
});
