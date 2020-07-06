const express = require('express');
const googleTrends = require('./routes/googleTrends');
const auth = require('./routes/auth');
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').config();
}

const app = express();

app.use(express.json());

// Mount router to a specific file
app.use('/api/v1/auth',  auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server on port: ${port}`));
