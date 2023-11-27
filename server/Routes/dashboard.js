// Importing the express library for creating a router.
const express = require('express');
get

// Creating an instance of an express router.
const router = express.Router();

// Handling GET requests to the '/home' endpoint by invoking the getInsight function.
router.get('/home', getInsight)

// Exporting the router to be used in other parts of the application.
module.exports = router;