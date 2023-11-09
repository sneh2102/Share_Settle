const express = require('express');
require('dotenv').config();
const router = require('./Routes/user');
const mongoose = require('mongoose'); 
const app = express();
const cors = require('cors');
const PORT = 5000; 
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', router);
app.use('/api/group', router)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to the database and listening on port', PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
