const WorldStatistic = require('../../models/WorldStatistic');
const CountryStatistic = require('../../models/CountryStatistic');
const StateStatistic = require('../../models/StateStatistic');

// @desc      Get World Stats
// @route     GET /api/v2/world
// @access    Public
exports.getWorldStats = async (req, res, next) => {
    const worldStats = await WorldStatistic.find({}).sort({
        _id: -1
    }).limit(1);

    res.status(200).json({
        success: true,
        data: worldStats[0],
    });
};

// @desc      Get Countries Stats
// @route     GET /api/v2/countries
// @access    Public
exports.getCountriesStats = async (req, res, next) => {
    const countriesStats = await CountryStatistic.aggregate([
        {
            $group: {
                _id: '$country',
                data: {
                    $last: '$$ROOT',
                },
            },
        },
        {
            $unset: ['_id'],
        },
        {
            $replaceRoot: {
                newRoot: '$data',
            },
        },
        {
            $sort: {
                'country': 1,
            },
        },
    ]);

    res.status(200).json({
        success: true,
        data: countriesStats,
    });
};
