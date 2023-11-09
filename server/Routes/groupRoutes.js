const router = require('express').Router();
const {createGroup, fetchUserGroups, fetchGroup} = require("../Controller/groupController");

// routes for group
router.post("/createGroup", createGroup);
router.post("/fetchUserGroups", fetchUserGroups);
router.get("/view/:id", fetchGroup)

module.exports = router;