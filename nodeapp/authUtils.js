const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, 'your_secret_key', { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(400).send('Authentication failed');

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Authentication failed');
    }
};

module.exports = { generateToken, validateToken };
