const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  categoryName: { type: String, required: true },
  budgetAmount: { type: Number, required: true },
  budgetColour: { type: String, required: true },
});

module.exports = mongoose.model('Budget', BudgetSchema);
const Budget = mongoose.model('Budget', BudgetSchema);

module.exports.addBudget = async (budget) => {
  const savedBudget = await Budget.create(budget);
  return savedBudget;
};

module.exports.updateBudget = async (budget) => {
  const updatedBudget = await Budget
    .updateOne({ userEmail: budget.userEmail, categoryName: budget.categoryName }, budget);
  return updatedBudget;
};

module.exports.getBudget = async (email) => {
  const budgets = await Budget.find({ userEmail: email });
  return budgets;
};
