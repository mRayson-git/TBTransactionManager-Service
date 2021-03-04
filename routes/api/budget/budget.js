const express = require('express');
const Budget = require('../../../models/Budget');

const router = express.Router();

// Save budget
router.post('/save', async (req, res) => {
  const budget = req.body;
  console.log(budget);
  // Check if we are updating
  const exisitingBudget = await Budget
    .find({ userEmail: budget.userEmail, categoryName: budget.categoryName });
  console.log(exisitingBudget);
  if (exisitingBudget.length === 1) {
    const updatedBudget = await Budget.updateBudget(budget);
    if (updatedBudget.n === 1) {
      res.json({ success: 1, message: 'Category has been updated' });
    } else {
      res.json({ success: 0, message: 'Category was not updated' });
    }
  } else {
    const savedBudget = await Budget.addBudget(budget);
    if (savedBudget) {
      res.json({ success: 1, message: 'Category has been added to budget' });
    } else {
      res.json({ success: 0, message: 'Category was not saved' });
    }
  }
});

// Get budget
router.get('/get/:email', async (req, res) => {
  const budgets = await Budget.getBudget(req.params.email);
  if (budgets.length === 0) {
    res.json({ success: 2, message: 'No categories have set budgets' });
  } else if (budgets.length > 0) {
    res.json({ success: 1, message: 'Budget has been built', result3: budgets });
  } else {
    res.json({ success: 0, message: 'Error retreiving budgeted categories' });
  }
});

// Delete budget
router.post('/delete', async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const deletedBudget = await Budget.deleteOne({ _id: req.body._id });
  if (deletedBudget.n === 1) {
    res.json({ success: 1, message: 'Category has been removed from your budget' });
  } else {
    res.json({ success: 0, message: 'Failed to delete the category' });
  }
});

module.exports = router;
