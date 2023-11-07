const router = require('express').Router();
const {createGroup, fetchUserGroups} = require("../Controller/groupController");

// routes for group
router.post("/createGroup", createGroup);
router.get("/fetchUserGroups", fetchUserGroups);

module.exports = router;