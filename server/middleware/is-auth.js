//Aswanth
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    console.log(decodedToken)
    decodedToken = jwt.verify(token,process.env.JWT_SECRET || 'secretkeyappearshere');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

/*const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require(process.env.JWT_SECRET); 

const verifyToken = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded; // Attach decoded user information to request object
    next(); // Call next middleware or route handler
  } catch (error) {
    // If token is invalid, return 401 Unauthorized
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;*/
