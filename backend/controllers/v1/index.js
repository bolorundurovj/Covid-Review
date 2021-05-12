const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const cron = require('node-cron');
const request = require('request');
const mongoose = require('mongoose');

const Data = require('./models/data');

require('dotenv').config();

let port = process.env.PORT || 2020;

const app = express();

app.use(cors());

let countryList = require('./country_list.json');
const mongoURL = process.env.URL;
console.log(mongoURL);

mongoose.connect(`${mongoURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('Database connection succeeded for covid19');
});

cron.schedule('23 59 * * * *', async () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate() - 1;
  var year = dateObj.getUTCFullYear();

  var newDay = day;

  var month_name = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUNE',
    'JULY',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  var formattedMonth = month;

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + newDay;
  }
  newdate = month + '-' + day + '-' + year;

  var formatted_date = day + ' ' + month_name[formattedMonth - 1] + ' ' + year;
  var fileName = newdate + '.csv';

  //var formatted_date = "13 APR 2020";
  //var fileName = "04-13-2020.csv";

  const results = [];
  let data = [];
  let totalActive = 0;
  let totalConfirmed = 0;
  let totalDeaths = 0;
  let totalRecovered = 0;

  const file = fs.createWriteStream(fileName);

  await new Promise((resolve, reject) => {
    request({
      uri:
        'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' +
        fileName,
    })
      .pipe(file)
      .on('finish', () => {
        fs.createReadStream(fileName)
          .pipe(csv())
          .on('data', (data) => {
            results.push(data);
            console.log(data);
          })
          .on('end', () => {
            if (results.length > 0) {
              // console.log(totalActive);
              for (var i = 0; i < results.length; i++) {
                totalConfirmed =
                  parseInt(results[i].Confirmed) + totalConfirmed;
                totalDeaths = parseInt(results[i].Deaths) + totalDeaths;
                totalRecovered =
                  parseInt(results[i].Recovered) + totalRecovered;
                totalActive =
                  parseInt(
                    results[i].Active !== (null || undefined || '')
                      ? results[i].Active
                      : '0'
                  ) + totalActive;
                // console.log(results[i].Active, totalActive);
              }
              // console.log(totalConfirmed);
              // console.log(totalDeaths);
              // console.log(totalRecovered);
              // console.log(totalActive);

              for (var j = 0; j < countryList.length; j++) {
                var country_obj = JSON.parse(JSON.stringify(countryList[j]));

                let state = getStatistics(country_obj, results);
                data.push(state);
              }

              var items = {
                total_confirmed: totalConfirmed,
                total_deaths: totalDeaths,
                total_recovered: totalRecovered,
                total_active: totalActive,
                last_date_updated: formatted_date,
                country_statistics: data.sort(
                  (a, b) => b.confirmed - a.confirmed
                ),
              };

              db.collection('covid_statistics').deleteOne({});
              db.collection('covid_statistics')
                .insertOne(items)
                .then(() => {
                  console.log('inserted successfully');
                });
            }
          });
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  }).catch((error) => {
    console.log(`Something happened: ${error}`);
  });
});

exports.getAll = async (req, res) => {
    const result = await db.collection('covid_statistics').findOne();
    return result;
};

exports.getGeoJSON = (req, res) => {
  db.collection('covid_statistics')
    .findOne()
    .then((results) => {
      if (results) {
        var data = [];
        var result = JSON.parse(JSON.stringify(results));
        var total_cases = 0;

        var country;

        for (var i = 0; i < result.country_statistics.length; i++) {
          country = result.country_statistics[i].country;

          for (var j = 0; j < result.country_statistics[i].states.length; j++) {
            var state_name;
            var state_address;
            var latitude;
            var longitude;
            var confirmed = 0;
            var deaths = 0;
            var recovered = 0;
            var active = 0;

            var name = result.country_statistics[i].states[j].name;

            result.country_statistics[i].states
              .filter((city) => city.name === name)
              .map((e) => {
                state_name = e.name;
                state_address = e.address;
                latitude = e.latitude;
                longitude = e.longitude;
                confirmed = confirmed + parseInt(e.confirmed);
                deaths = deaths + parseInt(e.deaths);
                recovered = recovered + parseInt(e.recovered);
                active = active + parseInt(e.active);
                total_cases =
                  parseInt(confirmed) +
                  parseInt(deaths) +
                  parseInt(recovered) +
                  parseInt(active);
              });

            var item = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              properties: {
                key: j,
                country: country,
                name: state_name,
                address: state_address,
                confirmed: confirmed,
                deaths: deaths,
                recovered: recovered,
                active: active,
                total_cases: total_cases,
              },
            };
            data.push(item);
          }
        }
        data = data.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj.properties.name)
              .indexOf(obj.properties.name) == pos
          );
        });
        res.json(data);
      }
    });
};

function getStatistics(country_obj, results) {
  const statistics = [];

  var country;
  var code;
  var flag;
  var coordinates;

  var confirmed = 0;
  var deaths = 0;
  var recovered = 0;
  var active = 0;

  var state_name;
  var state_latitude;
  var state_longitude;
  var state_address;
  var state_confirmed_count = 0;
  var state_deaths_count = 0;
  var state_recovered_count = 0;

  var country_statistics;

  for (var i = 0; i < results.length; i++) {
    if (results[i].Country_Region == country_obj.country) {
      country = results[i].Country_Region;
      code = country_obj.code;
      flag = country_obj.flag;
      coordinates = country_obj.coordinates;

      confirmed = parseInt(results[i].Confirmed) + confirmed;
      deaths = parseInt(results[i].Deaths) + deaths;
      recovered = parseInt(results[i].Recovered) + recovered;
      active = parseInt(results[i].Active) + active;

      if (results[i].Province_State.length > 0) {
        state_name = results[i].Province_State;
      } else {
        state_name = country;
      }
      state_address = results[i].Combined_Key;

      if (
        results[i].Lat !== undefined &&
        results[i].Lat.length > 0 &&
        results[i].Long_ !== undefined &&
        results[i].Long_.length > 0
      ) {
        state_latitude = parseFloat(results[i].Lat);
        state_longitude = parseFloat(results[i].Long_);
      } else {
        state_latitude = 0.0;
        state_longitude = 0.0;
      }

      state_confirmed_count = results[i].Confirmed;
      state_deaths_count = results[i].Deaths;
      state_recovered_count = results[i].Recovered;
      state_active_count = results[i].Active;

      var state_statistics = {
        key: Math.random().toString(36).substr(2, 5),
        name: state_name,
        address: state_address,
        latitude: state_latitude,
        longitude: state_longitude,
        confirmed: state_confirmed_count,
        deaths: state_deaths_count,
        recovered: state_recovered_count,
        active: state_active_count,
      };
      statistics.push(state_statistics);
    }
  }

  country_statistics = {
    country: country,
    code: code,
    flag: flag,
    coordinates: coordinates,
    confirmed: confirmed,
    deaths: deaths,
    recovered: recovered,
    active: active,
    states: statistics.sort().filter(function (el, i, a) {
      return i === a.indexOf(el);
    }),
  };
  return country_statistics;
}

