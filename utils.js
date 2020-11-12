function geoMunge(geoData) {

  const firstItem = geoData[0];
  return {
    formatted_query: firstItem.display_name,
    latitude: firstItem.lat,
    longitude: firstItem.lon
  };
}

function weatherMunge(weatherData) {

  return weatherData.data.map(oneWeather => {

    return {
      forecast: oneWeather.weather.description,
      time: oneWeather.datetime
    };
  }).slice(0, 8);
}

function yelpMunge(yelpData) {

  return yelpData.businesses.map(oneBusiness => {

    return {
      name: oneBusiness.name,
      image_url: oneBusiness.image_url,
      price: oneBusiness.price,
      rating: oneBusiness.rating,
      url: oneBusiness.url
    };
  });
}

function trailsMunge(trailsData) {

  return trailsData.trails.map(oneTrail => {

    return {
      name: oneTrail.name,
      location: oneTrail.location,
      length: oneTrail.length,
      stars: oneTrail.stars,
      star_votes: oneTrail.starVotes,
      summary: oneTrail.summary,
      trail_url: oneTrail.url,
      conditions: oneTrail.conditionStatus,
      condition_date: oneTrail.conditionDate,
      condition_time: 'n/a'
    };
  });
}

module.exports = {
  geoMunge,
  weatherMunge,
  yelpMunge,
  trailsMunge
};
