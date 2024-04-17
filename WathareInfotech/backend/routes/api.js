const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Get all data
router.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Filter data from time to time
router.get('/filter-data', async (req, res) => {
    try {
        const { startTime, frequency } = req.query;
        let endTime;
        switch (frequency) {
            case 'hour':
                endTime = new Date(new Date(startTime).getTime() + 60 * 60 * 1000);
                break;
            case 'day':
                endTime = new Date(new Date(startTime).getTime() + 24 * 60 * 60 * 1000);
                break;
            case 'week':
                endTime = new Date(new Date(startTime).getTime() + 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                endTime = new Date(new Date(startTime).getTime() + 30 * 24 * 60 * 60 * 1000);
                break;
            default:
                res.status(400).json({ message: 'Invalid frequency' });
                return;
        }
        const filteredData = await Data.find({
            ts: {
                $gte: new Date(startTime),
                $lt: endTime
            }
        });
        res.json(filteredData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
