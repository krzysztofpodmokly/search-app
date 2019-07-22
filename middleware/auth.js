const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there is no token
  if (!token) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user; // decoded value has user in the payload
    next();
  } catch (error) {
    res.status(401).send({ msg: 'Token is not valid' });
  }
};
