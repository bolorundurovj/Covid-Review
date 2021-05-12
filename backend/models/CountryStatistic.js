const mongoose = require('mongoose');

const countryStatisticSchema = mongoose.Schema({
    confirmed: {type: Number},
    deaths: {type: Number},
    recovered: {type: Number},
    active: {type: Number},
    addedAt: {
        type: Date,
        default: new Date()
    },
    country: {type: String},
    code: {type: String},
    flag: {type: String},
    coordinates: [Number],
}, {
    timestamps: true
});

module.exports = mongoose.model('CountryStatistic', countryStatisticSchema);