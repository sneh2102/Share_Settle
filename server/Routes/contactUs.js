// Importing the express library for creating a router.
const express = require('express');

// Importing the contactUs function from the contactUsController.
const {contactUs} = require('../Controller/contactUsController');

// Creating an instance of an express router.
const router = express.Router();

// Handling POST requests to the '/contact' endpoint by invoking the contactUs function.
router.post('/contact', contactUs);

// Exporting the router to be used in other parts of the application.
module.exports = router;