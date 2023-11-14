const Group = require('../Controller/groupController');
const GroupModal=require('../Models/groupModel')
const Expense = require('../Models/expenseModel');


const addExpense = async (req, res) => {
    try {
        var expense = req.body;
        var group = await GroupModal.findOne({
            _id: expense.groupId
        });

        if (!group) {
            var err = new Error("Invalid Group Id");
            err.status = 400;
            throw err;
        }

        expense.expenseDistribution = expense.amount / expense.involved.length;
        console.log(expense)
        var newExp = new Expense(expense);
        var newExpense = await Expense.create(newExp);

        var update_response = await Group.addExpenseList(
            expense.groupId,
            expense.amount,
            expense.ownerOfExpense,
            expense.involved
        );
        console.log(update_response);

        res.status(200).json({
            status: "Success",
            message: "New expenses added",
            Id: newExpense._id,
            splitUpdateResponse: update_response
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        var expense = await Expense.findOne({
            _id: req.body.id
        })
        if (!expense) {
            var err = new Error("Invalid Expense Id")
            err.status = 400
            throw err
        }
        var deleteExp = await Expense.deleteOne({
            _id: req.body.id
        })

        
        await Group.clearExpenseList(expense.groupId, expense.amount, expense.ownerOfExpense, expense.involved)

        res.status(200).json({
            status: "Success",
            message: "Expense is deleted",
            response: deleteExp
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

const viewGroupExpense = async (req, res) => {
    try {
        var groupExpense = await Expense.find({
            groupId: req.body.id
        })
        if (groupExpense.length == 0) {
            var err = new Error("No expense present for the group")
            err.status = 400
            throw err
        }
        var totalAmount = 0
        for (var expense of groupExpense) {
            totalAmount += expense['expenseAmount']
        }
        res.status(200).json({
            status: "Success",
            expense: groupExpense,
            total: totalAmount
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

const viewUserExpense = async (req, res) => {
    try {
        const userExpense = await Expense.find({
            involved: req.body.email
        })
        if (userExpense.length == 0) {
            const err = new Error("No expense present")
            err.status = 400
            throw err
        }
        var totalAmount = 0
        for (var expense of userExpense) {
            totalAmount += expense['expenseDistribution']
        }
        res.status(200).json({
            status: "Success",
            expense: userExpense,
            total: totalAmount
        })

    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}
const viewExpense = async (req, res) => {
    try {
        var expense = await Expense.findOne({
            _id: req.body.id
        })
        if (expense.length == 0) {
            var err = new Error("No expense present for the Id")
            err.status = 400
            throw err
        }
        res.status(200).json({
            status: "Success",
            expense: expense
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}


module.exports = { addExpense, deleteExpense, viewGroupExpense, viewUserExpense , viewExpense};
