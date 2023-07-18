const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  publishingDate: Date,
  thumbnailUrls: [String],
});

module.exports = mongoose.model('Video', videoSchema);