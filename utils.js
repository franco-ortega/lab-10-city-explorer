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
console.log(oneWeather);
    return {
      forecast: oneWeather.weather.description,
      time: oneWeather.datetime
    };
  
  });



  // return {
  //   forecast: weatherData.data[0].weather.description,
  //   time: weatherData.data[0].datetime
  // };


}





module.exports = {
  geoMunge,
  weatherMunge
};
