const Expense = require('../Models/expenseModel');

const removeMemberFromGroupExpenses = async (groupId, emailToRemove) => {
  try {
    const expenses = await Expense.find({ groupId });
    console.log(groupId, emailToRemove);

    for (const expense of expenses) {
      if (expense.involved.includes(emailToRemove)) {
        expense.involved = expense.involved.filter((email) => email !== emailToRemove);
        await expense.save();
      }
      if (expense.involved.length === 0) {
        await Expense.findByIdAndRemove(expense._id);
      }
      if (expense.involved.length === 1 && expense.involved[0] === expense.ownerOfExpense) {
        await Expense.findByIdAndRemove(expense._id);
      }
    }

    console.log('Member removed successfully from group expenses.');
  } catch (error) {
    console.error('Error removing member from group expenses:', error);
  }
};

module.exports = removeMemberFromGroupExpenses;
