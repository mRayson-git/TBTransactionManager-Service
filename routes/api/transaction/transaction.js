const express = require('express');
const Transaction = require('../../../models/Transaction');
// const verifyToken = require('../../../middlewares/tokenVerification');

const router = express.Router();

function isTransDup(mostRecent, newTrans) {
  // if there is no most recent
  if (!mostRecent) {
    return 0;
  }
  return (Date.parse(mostRecent.transDate) >= Date.parse(newTrans.transDate));
}

router.post('/save', async (req, res) => {
  try {
    const transactions = req.body;
    const newTransactions = [];

    let proper = 0;
    let anomalous = 0;
    const mostRecent = await Transaction
      .getMostRecent(transactions[0].userEmail, transactions[0].bankAccountName);
    // for each of the transactions, check if in date & add to database
    // eslint-disable-next-line no-restricted-syntax
    for (let transaction of transactions) {
      if (isTransDup(mostRecent, transaction)) {
        console.log('Trans is dup');
        anomalous += 1;
      } else {
        console.log('Trans is not dup');
        // eslint-disable-next-line max-len
        // eslint-disable-next-line no-await-in-loop
        const potentialCategories = await Transaction.find({ transPayee: transaction.transPayee, transCategory: { $not: { $regex: 'Uncategorized' } } });
        if (potentialCategories.length > 0) {
          transaction.category = potentialCategories[0].category;
          if (potentialCategories.length > 1) {
            transaction.transNote = 'Other potential categories were available';
          }
        }
        // eslint-disable-next-line no-await-in-loop
        transaction = await Transaction.addTransaction(transaction);
        newTransactions.push(transaction);
        proper += 1;
      }
    }
    console.log(`Proper transactions: ${proper}\nAnomalous transactions: ${anomalous}`);
    if (newTransactions.length === 0) {
      res.json({ success: 2, message: 'No new transactions', result3: newTransactions });
    } else {
      res.json({ success: 1, message: 'Transactions added', result3: newTransactions });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: 0, message: err });
  }
});

router.post('/saveCustom', async (req, res) => {
  try {
    const transactions = req.body;
    const newTransactions = [];

    // for each of the transactions, check if in date & add to database
    // eslint-disable-next-line no-restricted-syntax
    for (let transaction of transactions) {
      // eslint-disable-next-line no-await-in-loop
      const potentialCategories = await Transaction.find({ transPayee: transaction.transPayee, transCategory: { $not: { $regex: 'Uncategorized' } } });
      if (potentialCategories.length > 0) {
        transaction.category = potentialCategories[0].category;
        if (potentialCategories.length > 1) {
          transaction.transNote = 'Other potential categories were available';
        }
      }
      // eslint-disable-next-line no-await-in-loop
      transaction = await Transaction.addTransaction(transaction);
      newTransactions.push(transaction);
    }
    if (newTransactions.length === 0) {
      res.json({ success: 2, message: 'No new transactions', result3: newTransactions });
    } else {
      res.json({ success: 1, message: 'Transactions added', result3: newTransactions });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: 0, message: err });
  }
});

router.post('/update', async (req, res) => {
  const trans = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const updatedTrans = await Transaction.updateOne({ _id: trans._id }, trans);
  if (updatedTrans.n === 1) {
    res.json({ success: 1, message: 'Transaction updated' });
  } else {
    res.json({ success: 0, message: 'Transaction could not be updated' });
  }
});

router.get('/get/:email&:accountType&:transPayee&:transCategory&:numberOfResults', async (req, res) => {
  try {
    const transactions = await Transaction
      .getTransactions(req.params.email,
        req.params.accountType,
        req.params.transPayee,
        req.params.transCategory,
        req.params.numberOfResults);
    if (transactions.length > 0) {
      res.json({ success: 1, message: 'Retrieved transactions', result3: transactions });
    } else {
      res.json({ success: 2, message: 'No transactions exist for this type of account' });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ success: 0, message: err.message });
  }
});

router.get('/updateCategories/:userEmail', async (req, res) => {
  const payees = await Transaction.find({ userEmail: req.params.userEmail, transCategory: 'Uncategorized' }).distinct('transPayee');
  let transUpdated = false;
  if (payees.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const payee of payees) {
      // eslint-disable-next-line no-await-in-loop
      const potentialCategories = await Transaction.find({ transPayee: payee, transCategory: { $not: { $regex: 'Uncategorized' } } });
      if (potentialCategories.length > 0) {
        // eslint-disable-next-line no-await-in-loop
        const updatedTransactions = await Transaction.updateMany({ transPayee: payee, transCategory: 'Uncategorized' }, { transCategory: potentialCategories[0].transCategory });
        if (updatedTransactions.n > 0) {
          transUpdated = true;
        }
      }
    }
    if (transUpdated) {
      res.json({ success: 1, message: 'Attempted to update the categories of matched transactions' });
    } else {
      res.json({ success: 0, message: 'No transactions could be updated' });
    }
  } else {
    res.json({ success: 2, message: 'No uncategorized transactions' });
  }
});

module.exports = router;
