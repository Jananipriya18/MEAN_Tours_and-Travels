const express = require('express');
const { addUser, getUserByUsernameAndPassword, getAllUsers } = require('../controllers/userController');
const { validateToken } = require('../utils/authUtils');

const router = express.Router();

router.post('/signup', addUser);
router.post('/login', getUserByUsernameAndPassword);
router.get('/getAllUsers', validateToken, getAllUsers);

module.exports = router;
