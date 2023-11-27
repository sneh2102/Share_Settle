// Importing the express library for creating a router.
const express = require('express');

// Importing various functions from the expenseController.
const { addExpense, deleteExpense, viewGroupExpense, viewUserExpense, viewExpense, viewUserGroupExpense, categoryExpense, monthlyExpense, userCategoryExpense, userMonthlyExpense, recentUserExpenses} = require('../Controller/expenseController')

// Creating an instance of an express router.
const router = express.Router();

// Defining routes for different expense-related actions and associating them with corresponding controller functions.

// Handling POST requests to '/add' endpoint by invoking the addExpense function.
router.post("/add", addExpense)

// Handling POST requests to '/delete' endpoint by invoking the deleteExpense function.
router.post("/delete", deleteExpense)

// Handling POST requests to '/groupexpense' endpoint by invoking the viewGroupExpense function.
router.post("/groupexpense", viewGroupExpense)

// Handling POST requests to '/userexpense' endpoint by invoking the viewUserExpense function.
router.post("/userexpense", viewUserExpense)

// Handling POST requests to '/view' endpoint by invoking the viewExpense function.
router.post("/view", viewExpense)

// Handling POST requests to '/view/usergroupexpense' endpoint by invoking the viewUserGroupExpense function.
router.post("/view/usergroupexpense", viewUserGroupExpense)

// Handling POST requests to '/groupcategory' endpoint by invoking the categoryExpense function.
router.post("/groupcategory", categoryExpense)

// Handling POST requests to '/monthlyexpense' endpoint by invoking the monthlyExpense function.
router.post("/monthlyexpense",monthlyExpense)

// Handling POST requests to '/usercategory' endpoint by invoking the userCategoryExpense function.
router.post("/usercategory",userCategoryExpense)

// Handling POST requests to '/monthly/expense' endpoint by invoking the userMonthlyExpense function.
router.post("/monthly/expense",userMonthlyExpense)

// Handling POST requests to '/recent/expense' endpoint by invoking the recentUserExpenses function.
router.post("/recent/expense",recentUserExpenses)

// Exporting the router to be used in other parts of the application.
module.exports = router;