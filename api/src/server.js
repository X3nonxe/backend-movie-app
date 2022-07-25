const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('../handler/auth');
const user = require('../handler/users');

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/auth', auth);
app.use('/users', user);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
