const express = require('express');
const { bookTourPackage, getAllBookings, updateTourPackage, cancelTourPackage } = require('../controllers/bookingController');
const { validateToken } = require('../utils/authUtils');

const router = express.Router();

router.post('/book', validateToken, bookTourPackage);
router.get('/all', validateToken, getAllBookings);
router.put('/update/:id', validateToken, updateTourPackage);
router.delete('/cancel/:id', validateToken, cancelTourPackage);

module.exports = router;
