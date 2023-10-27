const express = require('express');
require('dotenv').config();
const router = require('./Routes/user');
const mongoose = require('mongoose'); // Fix typo here
const app = express();
const cors = require('cors');
const PORT = 5000; // Set a default port if PORT environment variable is not set

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', router);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Add options for useNewUrlParser and useUnifiedTopology
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to the database and listening on port', PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
