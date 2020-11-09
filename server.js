require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const request = require('superagent');
const port = 3000;

app.use(cors());

app.get('/', async(req, res) => {
  res.send('Hello world!');
});


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${port}`);
});
