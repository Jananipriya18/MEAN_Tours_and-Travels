const User = require('../models/userModel');
const { generateToken } = require('../utils/authUtils');

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getUserByUsernameAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(200).send({ message: 'Invalid Credentials' });
        }

        const token = generateToken(user._id);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { addUser, getUserByUsernameAndPassword, getAllUsers };
