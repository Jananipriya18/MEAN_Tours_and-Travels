const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'asdfghjkl', {
    expiresIn: '1h', // Adjust the expiration time as needed
  });
};

const validateToken = (req, res, next) => {
  try {
    console.log("came");
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part
    
    const decoded = jwt.verify(token, 'asdfghjkl'); // Use your secret key
    console.log("decoded", decoded);
    
    req.user = decoded; // Attach decoded token info to request object
    next();

  } catch (error) {
    console.log("error", error);
    res.status(401).json({ message: "Authentication failed" }); // Use 401 for auth failures
  }
};

module.exports = {
  generateToken,
  validateToken,
};