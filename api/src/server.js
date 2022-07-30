const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const toobusy = require('toobusy-js');
const hpp = require('hpp');
const helmet = require('helmet');
const csp = require('helmet-csp');
const auth = require('../handler/auth');
const user = require('../handler/users');
const movie = require('../handler/movies');
const list = require('../handler/lists');

const app = express();
dotenv.config();

// server protection
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet.noSniff());
app.use(csp({
  directives: {
    defaultSrc: [" 'self' "],
    scriptSrc: [" 'self' "],
    frameAncestors: [" 'none' "],
    styleSrc: [" 'none' "],
  },
}));
app.use(helmet.noCache());

// routing
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
  // monitor the event loop
  setInterval(() => {
    if (toobusy()) {
      console.log('Server is too busy');
    }
  });
});
