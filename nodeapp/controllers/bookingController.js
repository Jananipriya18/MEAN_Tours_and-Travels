const Booking = require('../models/bookingModel');
const mongoose = require('mongoose');

exports.getAllBookings = async (req, res) => {
  try {
    const { sortValue = 1, searchValue = '' } = req.body;
    const bookings = await Booking.find({ userName: new RegExp(searchValue, 'i') })
      .sort({ date: sortValue });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookTourPackage = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(200).json({ message: 'Tour package booked successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelTourPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
