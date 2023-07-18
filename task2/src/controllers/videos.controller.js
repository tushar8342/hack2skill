const express = require('express');
const Video = require('../models/video.model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const videos = await Video.find()
      .sort({ publishingDate: -1 })
      .skip(startIndex)
      .limit(limit);

    const total = await Video.countDocuments();

    const response = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      videos,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;