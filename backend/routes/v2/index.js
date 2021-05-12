const express = require('express');
const router = express.Router();

const { getCountriesStats, getWorldStats } = require('../../controllers/v2');

router.route('/world').get(getWorldStats)
router.route('/countries').get(getCountriesStats)

module.exports = router;