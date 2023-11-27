/**
 * Expense Controller:
 * This controller handles various operations related to expenses, such as adding, deleting, and viewing expenses.
 * It interacts with the Expense model and the Group controller for updating group expenses.
 */

// Importing required modules and models.
const Group = require('../Controller/groupController');
const GroupModal=require('../Models/groupModel')
const Expense = require('../Models/expenseModel');

/**
 * addExpense Function:
 * Adds a new expense to the system and updates the group's expense list.
 * @param {Object} req - The Express request object containing the expense details.
 * @param {Object} res - The Express response object to send the status of the operation.
 */
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

/**
 * deleteExpense Function:
 * Deletes an existing expense and updates the group's expense list accordingly.
 * @param {Object} req - The Express request object containing the expense id.
 * @param {Object} res - The Express response object to send the status of the operation.
 */
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
        console.log(expense);
        console.log(deleteExp);
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

/**
 * viewGroupExpense Function:
 * Retrieves expenses for a specific group and calculates the total amount.
 * @param {Object} req - The Express request object containing the group id.
 * @param {Object} res - The Express response object to send the retrieved expenses.
 */
const viewGroupExpense = async (req, res) => {
    try {
        var groupExpense = await Expense.find({
            groupId: req.body.id
        }).sort({
            dateOfExpense: -1
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

/**
 * viewUserExpense Function:
 * Retrieves expenses for a specific user and calculates the total amount.
 * @param {Object} req - The Express request object containing the user's email.
 * @param {Object} res - The Express response object to send the retrieved expenses.
 */
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

/**
 * viewUserGroupExpense Function:
 * Retrieves expenses for a specific user within a group and calculates the total amount.
 * @param {Object} req - The Express request object containing the user's email and group id.
 * @param {Object} res - The Express response object to send the retrieved expenses.
 */
const viewUserGroupExpense = async (req, res) => {
    console.log(req.body);
    try {
        const userExpense = await Expense.find({
            involved: req.body.email,
            groupId: req.body.id
        })
        console.log(userExpense);
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

/**
 * viewExpense Function:
 * Retrieves details of a specific expense.
 * @param {Object} req - The Express request object containing the expense id.
 * @param {Object} res - The Express response object to send the retrieved expense details.
 */
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
        console.log(err)
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/**
 * categoryExpense Function:
 * Retrieves and aggregates expenses based on categories for a specific group.
 * @param {Object} req - The Express request object containing the group id.
 * @param {Object} res - The Express response object to send the retrieved category-wise expenses.
 */
const categoryExpense = async (req, res) => {
    try {
        var categoryExpense = await Expense.aggregate([{
                $match: {
                    groupId: req.body.id
                }
            },
            {
                $group: {
                    _id: "$category",
                    amount: {
                        $sum: "$amount"
                    }
                }
            },{ $sort : {"_id" : 1 } }
        ])

        res.status(200).json({
            status: "success",
            data: categoryExpense
        })
    } catch (err) {

        res.status(err.status || 500).json({
            message: err.message
        })
    }
}                           

/**
 * monthlyExpense Function:
 * Retrieves and aggregates expenses based on months for a specific group.
 * @param {Object} req - The Express request object containing the group id.
 * @param {Object} res - The Express response object to send the retrieved monthly expenses.
 */
const monthlyExpense = async (req, res) => {
    try {
        var monthlyExpense = await Expense.aggregate([{
                $match: {
                    groupId: req.body.id
                }
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$dateOfExpense"
                        },
                        year: {
                            $year: "$dateOfExpense"
                        }
                    },
                    amount: {
                        $sum: "$amount"
                    }
                }
            },
            { $sort : {"_id.month" : 1 } }
        ])
        res.status(200).json({
            status: "success",
            data: monthlyExpense
        })
    } catch (err) {
      
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/**
 * userCategoryExpense Function:
 * Retrieves and aggregates expenses based on categories for a specific user.
 * @param {Object} req - The Express request object containing the user's email.
 * @param {Object} res - The Express response object to send the retrieved category-wise expenses.
 */
const userCategoryExpense = async (req, res) => {
    try {
        var categoryExpense = await Expense.aggregate([
            {
                $match: {
                    $or: [
                        { involved: req.body.user },
                        { ownerOfExpense: req.body.user }
                    ]
                }
            },
            {
                $group: {
                    _id: "$category",
                    amount: {
                        $sum: {
                            $cond: {
                                if: {
                                    $or: [
                                        { $in: [req.body.user, ["$involved"]] },
                                        { $in: [req.body.user, ["$ownerOfExpense"]] }
                                    ]
                                },
                                then: "$expenseDistribution",
                                else: "$amount"
                            }
                        }
                    }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json({
            status: "success",
            data: categoryExpense
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

/**
 * userMonthlyExpense Function:
 * Retrieves and aggregates expenses based on months for a specific user.
 * @param {Object} req - The Express request object containing the user's email.
 * @param {Object} res - The Express response object to send the retrieved monthly expenses.
 */
const userMonthlyExpense = async (req, res) => {
    try {
        var monthlyExpense = await Expense.aggregate([{
                $match: {
                    involved: req.body.user
                }
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$dateOfExpense"
                        },
                        year: {
                            $year: "$dateOfExpense"
                        }
                    },
                    amount: {
                        $sum: "$amount"
                    }
                }
            },
            { $sort : {"_id.month" : 1 } }
        ])
        res.status(200).json({
            status: "success",
            data: monthlyExpense
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/**
 * recentUserExpenses Function:
 * Retrieves the most recent expenses for a specific user.
 * @param {Object} req - The Express request object containing the user's email.
 * @param {Object} res - The Express response object to send the retrieved expenses.
 */
const recentUserExpenses = async (req, res) => {
    try {
        var recentExpense = await Expense.find({
            involved: req.body.user
        }).sort({
            $natural: -1  
        }).limit(5);  

        res.status(200).json({
            status: "Success",
            expense: recentExpense
        })
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

// Exporting the expense-related functions.
module.exports = { addExpense, deleteExpense, viewGroupExpense, viewUserExpense , viewExpense, viewUserGroupExpense, categoryExpense, monthlyExpense, userCategoryExpense, userMonthlyExpense, recentUserExpenses};