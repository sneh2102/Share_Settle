const router = require('express').Router();
const {createGroup, fetchUserGroups, fetchGroup, groupBalanceSheet} = require("../Controller/groupController");

// routes for group
router.post("/createGroup", createGroup);
router.post("/fetchUserGroups", fetchUserGroups);
router.get("/view/:id", fetchGroup)
router.post("/balancesheet" ,groupBalanceSheet)

module.exports = router;