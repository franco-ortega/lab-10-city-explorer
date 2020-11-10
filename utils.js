function geoMunge(geoData) {

  const firstItem = geoData[0];
  return {
    formatted_query: firstItem.display_name,
    latitude: firstItem.lat,
    longitude: firstItem.lon
  };
}


function weatherMunge(weatherData) {

  return {
    forecast: weatherData.data[0].weather.description,
    time: weatherData.data[0].datetime
  };
  
  // const firstItem.map = weatherData[0];
  // return {
  //   forecast: firstItem.data,
  //   time: firstItem.datetime
  // };


}


module.exports = {
  geoMunge,
  weatherMunge
};
