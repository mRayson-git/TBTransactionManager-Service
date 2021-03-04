const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Start app
const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/users', require('./routes/api/user/users'));
app.use('/api/parser', require('./routes/api/parser/parser'));
app.use('/api/transaction', require('./routes/api/transaction/transaction'));
app.use('/api/budget', require('./routes/api/budget/budget'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on point ${PORT}`));
