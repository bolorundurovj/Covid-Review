const fs = require('fs');
const request = require('request');
const moment = require('moment');
const csv = require('csvtojson');
const csvParser = require('csv-parser');

const WorldStatistic = require('../../models/WorldStatistic');
const CountryStatistic = require('../../models/CountryStatistic');
const StateStatistic = require('../../models/StateStatistic');

const countryList = require('../../country_list.json');

const formattedDate = moment().local().subtract(1, 'days').format('MM-DD-YYYY');
const fileName = formattedDate + '.csv';
const file = fs.createWriteStream(fileName);
const csvFilePath = `./${fileName}`;

const create = async () => {
    new Promise((resolve, reject) => {
        request({
                uri: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' +
                    fileName,
            })
            .pipe(file)
            .on('finish', () => {
                console.log('written to file');
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    }).catch((error) => {
        console.log(`Something happened: ${error}`);
    });
}

create();

class DocCollection extends Array {
    sum(key) {
        return this.reduce((a, b) => Number(a) + (Number(b[key]) || 0), 0);
    }
}
let docs = [];

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        new DocCollection(jsonObj);
    })


class StatsAggregator {
    static async formatWorldStats() {
        const totalConfirmed = docs.sum('Confirmed');
        const totalDeaths = docs.sum('Deaths');
        const totalRecovered = docs.sum('Recovered');
        const totalActive = docs.sum('Active');

        const worldStat = new WorldStatistic({
            totalConfirmed,
            totalDeaths,
            totalRecovered,
            totalActive
        })
        await worldStat.save().then(() => {
            console.log('Done');
        })
    }
}

module.exports = StatsAggregator;