require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const request = require('superagent');
const port = process.env.PORT || 3000;
const geoData = require('./data/geo.json');
const { geoMunge, weatherMunge, yelpMunge, trailsMunge } = require('./utils.js');
//const weatherData = require('./data/weather.json');

app.use(cors());

//.GET for all the Location data
app.get('/locationAll', async(req, res) => {
  try {
    res.json(geoData);
  } catch(e) {
    res.json({ error: e.message });
  }
});


//Location ENDPOINT (Step 2)
app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_KEY}&q=${req.query.search}&format=json`;

    const response = await request.get(URL);

    const newResponse = geoMunge(response.body);

    res.json(newResponse);
  } catch(e) {
    res.json({ error: e.message });
  }
});



//.GET for all the Weather data (Step 1)
// app.get('/weatherAll', async(req, res) => {
//   try {
//     res.json(weatherData);
//   } catch(e) {
//     res.json({ error: e.message });
//   }
// });


//Weather ENDPOINT (Step 2)
app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const response = await request.get(URL);

    const newResponse = weatherMunge(response.body);

    res.json(newResponse);

  } catch(e) {
    res.json({ error: e.message });
  }
});


//Yelp ENDPOINT (Step 3)
app.get('/reviews', async(req, res) => {
  try {

    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;

    const response = await request.get(URL).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);

    const newResponse = yelpMunge(response.body);

    res.json(newResponse);

  } catch(e) {
    res.json({ error: e.message });
  }
});


//Trails ENDPOINT (Step 4)
app.get('/trails', async(req, res) => {
  try {

    // const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;

    // const response = await request.get(URL).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);

//    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.TRAILS_KEY}`;

    const URL2 = 'https://www.hikingproject.com/data/get-trails?lat=45.6528812&lon=-122.8367489&maxDistance=200&key=200965076-c4d700c6cc9848e5b38f8696d3d1038a';


    const response = await request.get(URL2);

    const newResponse = trailsMunge(response.body);

    res.json(newResponse);


  } catch(e) {
    res.json({ error: e.message });
  }
});




app.listen(port, () => {
  console.log(`Started on http://localhost:${port}`);
});

