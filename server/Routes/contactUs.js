const express = require('express');
const {contactUs} = require('../Controller/contactUsController');

const {} = require('../Controller/');

const router = express.Router();

router.post('/contact-us', contactUs);

module.exports = router;