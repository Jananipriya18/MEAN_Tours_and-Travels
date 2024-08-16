const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(400).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Authentication failed' });
  }
};
