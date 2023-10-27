const router = require('express').Router();
const {createGroup} = require("./controllers/groupController");

// test routes
// const { createTestData, fetchTestData } = require("./controllers/Test");

// router.get("/fetch", fetchTestData);
// router.post("/create", createTestData);

// routes for group
router.post("/createGroup", createGroup);

module.exports = router;