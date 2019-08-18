const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Config mongoose
mongoose.set('useFindAndModify', false);

const dummyData = require('./dummyData');

// Create mongoose connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eliftech', {
  useNewUrlParser: true,
});

// Listen connection error
mongoose.connection.on('error', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// Bind promise to mongoose
mongoose.Promise = Promise;

const api = require('./routes/api.routes');
app.use('/api', api);

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, () => (console.log('App is listening on port 3001!')));
