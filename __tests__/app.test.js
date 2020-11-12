require('dotenv').config();
const { geoMunge, weatherMunge, yelpMunge, trailsMunge } = require('../utils.js');

// const { execSync } = require('child_process');

// const fakeRequest = require('supertest');
// const app = require('../lib/app');
// const client = require('../lib/client');

// describe('app routes', () => {
//   describe('routes', () => {
//     let token;
  
//     beforeAll(async done => {
//       execSync('npm run setup-db');
  
//       client.connect();
  
//       const signInData = await fakeRequest(app)
//         .post('/auth/signup')
//         .send({
//           email: 'jon@user.com',
//           password: '1234'
//         });
      
//       token = signInData.body.token;
  
//       return done();
//     });
  
//     afterAll(done => {
//       return client.end(done);
//     });





test('returns munged location data', async() => {

  const input =   [{
    'place_id': '282983083',
    'licence': 'https://locationiq.com/attribution',
    'osm_type': 'relation',
    'osm_id': '186579',
    'boundingbox': [
      '45.432536',
      '45.6528812',
      '-122.8367489',
      '-122.4720252'
    ],
    'lat': '45.5202471',
    'lon': '-122.6741949',
    'display_name': 'Portland, Multnomah County, Oregon, USA',
    'class': 'place',
    'type': 'city',
    'importance': 0.75356571743377,
    'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
  },
  {
    'place_id': '236025890',
    'licence': 'https://locationiq.com/attribution',
    'osm_type': 'relation',
    'osm_id': '132500',
    'boundingbox': [
      '43.606363',
      '43.727658',
      '-70.346095',
      '-70.076935'
    ],
    'lat': '43.6610277',
    'lon': '-70.2548596',
    'display_name': 'Portland, Cumberland County, Maine, USA',
    'class': 'place',
    'type': 'city',
    'importance': 0.65297101392868,
    'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
  }];

  const expectation = 
    {
      formatted_query: 'Portland, Multnomah County, Oregon, USA',
      latitude: '45.5202471',
      longitude: '-122.6741949'
    };

  const output = geoMunge(input);

  expect(output).toEqual(expectation);
});


test('returns munged weather data', async() => {

  const input =   {
    'data': [
      {
        'moonrise_ts': 1588728093,
        'wind_cdir': 'SW',
        'rh': 75,
        'pres': 899.112,
        'high_temp': 15.6,
        'sunset_ts': 1588735301,
        'ozone': 336.647,
        'moon_phase': 0.986614,
        'wind_gust_spd': 9.6,
        'snow_depth': 0,
        'clouds': 27,
        'ts': 1588662060,
        'sunrise_ts': 1588683144,
        'app_min_temp': 3.4,
        'wind_spd': 2.52495,
        'pop': 65,
        'wind_cdir_full': 'southwest',
        'slp': 1018.93,
        'moon_phase_lunation': 0.44,
        'valid_date': '2020-05-05',
        'app_max_temp': 15.6,
        'vis': 23.2905,
        'dewpt': 6.5,
        'snow': 0,
        'uv': 7.86581,
        'weather': {
          'icon': 'c02d',
          'code': 802,
          'description': 'Scattered clouds'
        },
        'wind_dir': 218,
        'max_dhi': null,
        'clouds_hi': 0,
        'precip': 2.0625,
        'low_temp': 1.2,
        'max_temp': 15.7,
        'moonset_ts': 1588682768,
        'datetime': '2020-05-05',
        'temp': 11,
        'min_temp': 6.7,
        'clouds_mid': 4,
        'clouds_low': 27
      }]
  };

  const expectation = [
    {
      forecast: 'Scattered clouds',
      time: '2020-05-05'
    }];

  const output = weatherMunge(input);

  expect(output).toEqual(expectation);
});



test.only('returns munged yelp data', async() => {

  const input =  { businesses: [ {
    'id': 'WavvLdfdP6g8aZTtbBQHTw',
    'alias': 'gary-danko-san-francisco',
    'name': 'Gary Danko',
    'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg',
    'is_claimed': true,
    'is_closed': false,
    'url': 'https://www.yelp.com/biz/gary-danko-san-francisco?adjust_creative=wpr6gw4FnptTrk1CeT8POg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=wpr6gw4FnptTrk1CeT8POg',
    'phone': '+14157492060',
    'display_phone': '(415) 749-2060',
    'review_count': 5296,
    'categories': [
      {
        'alias': 'newamerican',
        'title': 'American (New)'
      },
      {
        'alias': 'french',
        'title': 'French'
      },
      {
        'alias': 'wine_bars',
        'title': 'Wine Bars'
      }
    ],
    'rating': 4.5,
    'location': {
      'address1': '800 N Point St',
      'address2': '',
      'address3': '',
      'city': 'San Francisco',
      'zip_code': '94109',
      'country': 'US',
      'state': 'CA',
      'display_address': [
        '800 N Point St',
        'San Francisco, CA 94109'
      ],
      'cross_streets': ''
    },
    'coordinates': {
      'latitude': 37.80587,
      'longitude': -122.42058
    },
    'photos': [
      'https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg',
      'https://s3-media4.fl.yelpcdn.com/bphoto/FmXn6cYO1Mm03UNO5cbOqw/o.jpg',
      'https://s3-media4.fl.yelpcdn.com/bphoto/HZVDyYaghwPl2kVbvHuHjA/o.jpg'
    ],
    'price': '$$$$',
    'hours': [
      {
        'open': [
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 0
          },
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 1
          },
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 2
          },
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 3
          },
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 4
          },
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 5
          },
          {
            'is_overnight': false,
            'start': '1730',
            'end': '2200',
            'day': 6
          }
        ],
        'hours_type': 'REGULAR',
        'is_open_now': false
      }
    ],
    'transactions': [],
    'special_hours': [
      {
        'date': '2019-02-07',
        'is_closed': null,
        'start': '1600',
        'end': '2000',
        'is_overnight': false
      }
    ]
  }]
  };

  const expectation = [
    {
      name: 'Gary Danko',
      image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg',
      price: '$$$$',
      rating: 4.5,
      url: 'https://www.yelp.com/biz/gary-danko-san-francisco?adjust_creative=wpr6gw4FnptTrk1CeT8POg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=wpr6gw4FnptTrk1CeT8POg'
    }];

  const output = yelpMunge(input);

  expect(output).toEqual(expectation);
});




test('returns munged trails data', async() => {

  const input =   {
    'trails': [
      {
        'id': 7005246,
        'name': 'Enchantments Traverse',
        'type': 'Recommended Route',
        'summary': 'An extraordinary hike that takes you through all of the beauty that the Enchantments have to offer!',
        'difficulty': 'black',
        'stars': 4.9,
        'starVotes': 77,
        'location': 'Leavenworth, Washington',
        'url': 'https://www.hikingproject.com/trail/7005246/enchantments-traverse',
        'imgSqSmall': 'https://cdn2.apstatic.com/photos/hike/7032015_sqsmall_1554932324.jpg',
        'imgSmall': 'https://cdn2.apstatic.com/photos/hike/7032015_small_1554932324.jpg',
        'imgSmallMed': 'https://cdn2.apstatic.com/photos/hike/7032015_smallMed_1554932324.jpg',
        'imgMedium': 'https://cdn2.apstatic.com/photos/hike/7032015_medium_1554932324.jpg',
        'length': 19.1,
        'ascent': 4556,
        'descent': -6674,
        'high': 7795,
        'low': 1319,
        'longitude': -120.8206,
        'latitude': 47.5278,
        'conditionStatus': 'All Clear',
        'conditionDetails': 'Dry',
        'conditionDate': '2020-10-13 14:06:06'
      }],
        
  };

  const expectation = [
    {
      name: 'Enchantments Traverse',
      location: 'Leavenworth, Washington',
      length: 19.1,
      stars: 4.9,
      star_votes: 77,
      summary: 'An extraordinary hike that takes you through all of the beauty that the Enchantments have to offer!',
      trail_url: 'https://www.hikingproject.com/trail/7005246/enchantments-traverse',
      conditions: 'All Clear',
      condition_date: '2020-10-13 14:06:06',
      condition_time: 'n/a'
    }];

  const output = trailsMunge(input);

  expect(output).toEqual(expectation);
});

