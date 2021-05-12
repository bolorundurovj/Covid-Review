const mongoose = require('mongoose');

const worldStatisticSchema = mongoose.Schema({
    totalConfirmed: {type: Number},
    totalDeaths: {type: Number},
    totalRecovered: {type: Number},
    totalActive: {type: Number},
    newConfirmed: {type: Number},
    newDeaths: {type: Number},
    newRecovered: {type: Number},
    newActive: {type: Number},
    addedAt: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('WorldStatistic', worldStatisticSchema);