const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Course', courseSchema);