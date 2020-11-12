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

  return {
    name: trailsData.trails[0].name,
    location: trailsData.trails[0].location,
    length: trailsData.trails[0].length,
    stars: trailsData.trails[0].stars,
    star_votes: trailsData.trails[0].starVotes,
    summary: trailsData.trails[0].summary,
    trail_url: trailsData.trails[0].url,
    conditions: trailsData.trails[0].conditionStatus,
    condition_date: trailsData.trails[0].conditionDate,
    condition_time: 'n/a'
  };

  // return yelpData.businesses.map(oneBusiness => {

  //   return {
  //     name: oneBusiness.name,
  //     image_url: oneBusiness.image_url,
  //     price: oneBusiness.price,
  //     rating: oneBusiness.rating,
  //     url: oneBusiness.url
  //   };

  // });

}







module.exports = {
  geoMunge,
  weatherMunge,
  yelpMunge,
  trailsMunge
};
