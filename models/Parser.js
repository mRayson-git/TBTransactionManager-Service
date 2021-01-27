const mongoose = require('mongoose');

const ParserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  bankAccountName: { type: String, required: true },
  hasHeader: { type: Boolean, required: true },
  dateCol: { type: Number, required: true },
  amountCol: { type: Number, required: true },
  payeeCol: { type: Number, required: true },
  typeCol: { type: Number, required: true },
});

module.exports = mongoose.model('Parser', ParserSchema);
const Parser = mongoose.model('Parser', ParserSchema);

// Save a parser
module.exports.saveParser = async (parser) => {
  const savedParser = await Parser.create(parser);
  return savedParser;
};

// Get parsers
module.exports.getParsers = async (userEmail) => {
  const parsers = await Parser.find({ email: userEmail });
  return parsers;
};

// Delete a parser
module.exports.deleteParser = async (userEmail, accountName) => {
  const deleted = await Parser.deleteOne({ email: userEmail, bankAccountName: accountName });
  return deleted;
};

// Update a parser
module.exports.updateParser = async (parser) => {
  // eslint-disable-next-line max-len
  const updatedParser = await Parser.updateOne({ email: parser.email, bankAccountName: parser.bankAccountName }, parser);
  return updatedParser;
};
