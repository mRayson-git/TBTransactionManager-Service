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
      res.json({ success: true, message: 'Parser has been saved' });
    } else {
      res.json({ success: false, message: 'Parser could not be saved' });
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

router.get('/get/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const parsers = await Parser.getParsers(userEmail);
    if (parsers.length !== 0) {
      res.json({ success: true, message: 'Retrieved parsers', result3: parsers });
    } else {
      res.json({ success: false, message: 'No parsers to retrieve' });
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

module.exports = router;
