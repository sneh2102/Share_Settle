const express = require('express');
const { addExpense, deleteExpense, viewGroupExpense, viewUserExpense} = require('../Controller/expenseController')

const router = express.Router();


router.post("/add", addExpense)
router.post("/delete", deleteExpense)
router.post("/groupexpense", viewGroupExpense)
router.post("/userexpense", viewUserExpense)



module.exports = router;