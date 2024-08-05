// utils/jwtUtil.js
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace this with your actual secret key
const expiresIn = '1h'; // Token expiration time

/**
 * Generates a JWT token.
 * @param {Object} payload - The payload to encode in the token.
 * @returns {string} The generated JWT token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} The decoded payload if the token is valid, or null if it is not.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
