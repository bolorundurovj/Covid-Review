const mongoose = require('mongoose');

const stateStatisticSchema = mongoose.Schema({
    confirmed: {type: Number},
    deaths: {type: Number},
    recovered: {type: Number},
    active: {type: Number},
    addedAt: {
        type: Date,
        default: new Date()
    },
    key: {type: String},
    address: {type: String},
    name: {type: String},
    coordinates: [Number],
}, {
    timestamps: true
});

module.exports = mongoose.model('StateStatistic', stateStatisticSchema);