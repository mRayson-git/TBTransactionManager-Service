/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  bankAccountName: { type: String, required: true },
  bankAccountType: { type: String, required: true },
  transType: { type: String, required: true },
  transDate: { type: Date, required: true },
  transAmount: { type: String, required: true },
  transPayee: { type: String, required: true },
  transCategory: { type: String, required: true },
  transNote: { type: String, required: false },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports.addTransaction = async (transaction) => {
  const addedTransaction = await Transaction.create(transaction);
  return addedTransaction;
};

module.exports.getMostRecent = async (email, accountName) => {
  const mostRecent = await Transaction
    .findOne({ userEmail: email, bankAccountName: accountName }).sort({ transDate: -1 }).exec();
  return mostRecent;
};

// eslint-disable-next-line max-len
module.exports.getTransactions = async (email, accountType, transPayee, transCategory, numberOfResults) => {
  const transactions = await Transaction
    // eslint-disable-next-line quotes
    .find({ userEmail: email, bankAccountType: { $regex: `${accountType}` }, transPayee: { $regex: `${transPayee}` }, transCategory: { $regex: `${transCategory}` } })
    .sort({ transDate: -1 })
    .limit(Number(numberOfResults));
  return transactions;
};
// `

module.exports.getAllTransactions = async (email) => {
  const transactions = await Transaction
    .find({ userEmail: email }).sort({ transDate: -1 }).exec();
  return transactions;
};
