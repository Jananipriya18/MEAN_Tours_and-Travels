const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    packageName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
