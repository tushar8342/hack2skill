const mongoose = require('mongoose');

const mockData1Schema = new mongoose.Schema({
    full_name: String,
    email: String,
    number: String,
    city: String,
    url: String,
});

const MockData1 = mongoose.model('MockData1', mockData1Schema);

module.exports = MockData1;