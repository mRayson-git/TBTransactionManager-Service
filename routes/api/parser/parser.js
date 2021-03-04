const express = require('express');
const Parser = require('../../../models/Parser');
const verifyToken = require('../../../middlewares/tokenVerification');

const router = express.Router();

// Save parser
router.post('/save', async (req, res) => {
  try {
    const savedParser = await Parser.saveParser(req.body);
    if (savedParser) {
      console.log(savedParser);
      res.json({ success: 1, message: 'Parser has been saved' });
    } else {
      res.json({ success: 0, message: 'Parser could not be saved' });
    }
  } catch (err) {
    res.json({ success: 0, message: err });
  }
});

router.get('/get/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const parsers = await Parser.getParsers(userEmail);
    if (parsers.length !== 0) {
      res.json({ success: 1, message: 'Retrieved parsers', result3: parsers });
    } else {
      res.json({ success: 2, message: 'No parsers to retrieve' });
    }
  } catch (err) {
    res.json({ success: 0, message: err });
  }
});

// Update
router.post('/update', async (req, res) => {
  try {
    const parser = req.body;
    console.log(parser);
    const updatedParser = await Parser.updateParser(parser);
    if (updatedParser.n === 1) {
      res.json({ success: 1, message: 'Parser has been updated' });
    } else {
      res.json({ success: 0, message: 'Parser could not be updated' });
    }
  } catch (err) {
    res.json({ success: 0, message: 'Parser could not be updated' });
  }
});

// Delete
router.post('/delete', async (req, res) => {
  try {
    const deletedParser = await Parser.deleteParser(req.body.email, req.body.bankAccountName);
    if (deletedParser.n === 1) {
      res.json({ success: 1, message: 'Parser has been deleted' });
    } else {
      res.json({ success: 0, message: 'Parser could not be deleted' });
    }
  } catch (err) {
    res.json({ success: 0, message: 'Parser could not be deleted' });
  }
});

module.exports = router;
