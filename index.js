const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors());

app.use(router);

// connecting mongodb
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
});

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});