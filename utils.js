function geoMunge(geoData) {
  
    const firstItem = geoData[0];
    return {
      formatted_query: firstItem.display_name,
      latitude: firstItem.lat,
      longitude: firstItem.lon
    };
  
    
}

//   return {
//     geoData.map((oneData) => {



//     });
//   }
// }



//   return {
//     formatted_query: geoData.display_name,
//     latitude: geoData.lat,
//     longitude: geoData.lon,
//     test: 'test string'
//   };




module.exports = {
  geoMunge
};
