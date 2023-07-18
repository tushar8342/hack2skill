const mongoose = require('mongoose');

const mockData2Schema = new mongoose.Schema({
    full_name: String,
    email: String,
    team_name: String,
});

const MockData2 = mongoose.model('MockData2', mockData2Schema);

module.exports = MockData2;