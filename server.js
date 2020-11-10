require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const request = require('superagent');
const port = process.env.PORT || 3000;
const geoData = require('./data/geo.json');
const { geoMunge } = require('./utils.js');

app.use(cors());

app.get('/', async(req, res) => {
  try {
    //const URL = 'http://localhost:3000/data/geo.json';
    //const mungedData = geoMunge(geoData);
    //const response = await request.get(URL);
    res.json(geoData);
  } catch(e) {
    res.json({ error: e.message });
  }
});


app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_KEY}&q=${req.query.SEARCH_STRING}&format=json`;

    //const mungedData = geoMunge(URL);

    const response = await request.get(URL);

    const newResponse = geoMunge(response.body);

    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});



app.listen(port, () => {
  console.log(`Started on http://localhost:${port}`);
});

