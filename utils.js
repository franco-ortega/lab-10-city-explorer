function geoMunge(geoData) {

  const firstItem = geoData[0];
  return {
    formatted_query: firstItem.display_name,
    latitude: firstItem.lat,
    longitude: firstItem.lon
  };
}


function weatherMunge(weatherData) {

  const firstItem = weatherData[0];
  return {
    forecast: firstItem.weather,
    time: firstItem.datetime
  };
}


module.exports = {
  geoMunge
};
