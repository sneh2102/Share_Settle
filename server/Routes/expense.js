const express = require('express');
const { addExpense, deleteExpense, viewGroupExpense, viewUserExpense, viewExpense, viewUserGroupExpense} = require('../Controller/expenseController')

const router = express.Router();


router.post("/add", addExpense)
router.post("/delete", deleteExpense)
router.post("/groupexpense", viewGroupExpense)
router.post("/userexpense", viewUserExpense)
router.post("/view", viewExpense)
router.post("/view/usergroupexpense", viewUserGroupExpense)



module.exports = router;