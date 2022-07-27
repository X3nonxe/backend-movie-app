const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('../handler/auth');
const user = require('../handler/users');
const movie = require('../handler/movies');
const list = require('../handler/lists');

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/movies', movie);
app.use('/api/lists', list);

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
