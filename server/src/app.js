const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const apiV1 = require('./routes/v1.js');

const app = express();

/* Middlewares */
// Security
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

// Logging
app.use(morgan('combined'));

// Others
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

/* Routes */
app.use('/v1', apiV1);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
