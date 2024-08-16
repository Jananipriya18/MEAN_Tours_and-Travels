const Booking = require('../models/bookingModel');

const bookTourPackage = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).send(booking);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const { searchValue, sortValue } = req.query;
        const bookings = await Booking.find({
            userName: { $regex: searchValue, $options: 'i' }
        }).sort({ date: sortValue });
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateTourPackage = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const cancelTourPackage = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        res.status(200).send({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { bookTourPackage, getAllBookings, updateTourPackage, cancelTourPackage };
