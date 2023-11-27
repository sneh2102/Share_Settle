// Importing the express library for creating a router.
const router = require('express').Router();

// Importing various functions from the groupController.
const {createGroup, fetchUserGroups, fetchGroup, groupBalanceSheet,leaveGroup,makeSettlement,groupCategoryExpense} = require("../Controller/groupController");

// Defining routes for different group-related actions and associating them with corresponding controller functions.

// Handling POST requests to '/createGroup' endpoint by invoking the createGroup function.
router.post("/createGroup", createGroup);

// Handling POST requests to '/fetchUserGroups' endpoint by invoking the fetchUserGroups function.
router.post("/fetchUserGroups", fetchUserGroups);

// Handling GET requests to '/view/:id' endpoint by invoking the fetchGroup function.
router.get("/view/:id", fetchGroup)

// Handling POST requests to '/balancesheet' endpoint by invoking the groupBalanceSheet function.
router.post("/balancesheet" ,groupBalanceSheet)

// Handling POST requests to '/leave' endpoint by invoking the leaveGroup function.
router.post("/leave",leaveGroup)

// Handling POST requests to '/settle' endpoint by invoking the makeSettlement function.
router.post("/settle",makeSettlement)

// Exporting the router to be used in other parts of the application.
module.exports = router;