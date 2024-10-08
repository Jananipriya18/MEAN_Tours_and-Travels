const express = require('express');
const { bookTourPackage, getAllBookings, updateTourPackage, cancelTourPackage } = require('../controllers/bookingController');
const { validateToken } = require('../authUtils');

const router = express.Router();

router.post('/book', validateToken, bookTourPackage);
router.post('/all', validateToken, getAllBookings);
router.put('/update/:id', validateToken, updateTourPackage);
router.delete('/cancel/:id', validateToken, cancelTourPackage);

module.exports = router;
