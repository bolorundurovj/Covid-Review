const express = require('express');
const fs = require('fs');
const cors = require('cors');
const cron = require('node-cron');
const request = require('request');
const mongoose = require('mongoose');
const moment = require('moment');
const { formatWorldStats } = require('./helpers/v2/dbSeeder');

require('dotenv').config();

let port = process.env.PORT || 2020;

const app = express();

app.use(cors());

let countryList = require('./country_list.json');
const mongoURL = process.env.URL;

mongoose.connect(`${mongoURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection Error ----->'));
db.once('open', function (callback) {
  console.log('Database Connected ----->');
});

const v1 = require('./routes/v1/index');
const v2 = require('./routes/v2/index');

app.use('/api/v1', v1);
app.use('/api/v2', v2);

cron.schedule('23 22 * * * *', async () => {
  console.log("working ...");
  formatWorldStats
}, {
  scheduled: true,
  timezone: "Europe/London"
});

app.listen(port, () => {
  console.log(`App is live on http://localhost:${port}`);
});