const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  // make hased password
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    };
    // Check if user already exists
    const ogUser = await User.getUserByEmail(user.email);
    if (!ogUser) {
      const result = await User.addUser(user);
      res.json({ message: 'User has been added', result });
    } else {
      console.log(ogUser);
      res.json({ message: 'Email already in use' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send('Error with creation');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.getUserByEmail(req.body.email);
    console.log(user);
    if (user) {
      console.log(req.body.password);
      console.log(user.password);
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ message: 'Incorrect password' });
      } else {
        const payload = { subject: req.body.email };
        const token = jwt.sign(payload, process.env.SECRET);
        res.json({ message: 'Success', user, token });
      }
    } else {
      res.json({ message: 'User does not exist' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send('Error with login');
  }
});

module.exports = router;
