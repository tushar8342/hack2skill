const express = require("express")

const router = express.Router()

const MockData1 = require('../models/mockData1');
const MockData2 = require('../models/mockData2');

router.get('/data', async (req, res) => {
    try {
        const data = await MockData1.aggregate([
            {
                $lookup: {
                    from: 'mockdata2',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'team_info',
                },
            },
            {
                $project: {
                    _id: 0,
                    'team_info.team_name': 1,
                    full_name: 1,
                    email: 1,
                    number: 1,
                    city: 1,
                    url: 1,
                },
            },
        ]);

        console.log(data);

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


module.exports = router;