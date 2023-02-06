const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const app = express();
const fs= require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static('public'))
app.get('/', async (req, res, next) => {
  // generate a jwt token for user
  const secret = fs.readFileSync('./certs/private.pem')
  const token= jwt.sign({}, secret, { expiresIn: '1h', algorithm:'RS256'})
  res.send({ token});
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
