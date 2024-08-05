// middlewares/auth.js
const CustomError = require('../utils/customError');
const { verifyToken } = require('../utils/jwtUtil');

/**
 * Middleware to authenticate the user using a JWT token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const checkAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new CustomError('Access denied. No token provided', 401)
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new CustomError('Invalid token', 401)
  }

  req.userId = decoded.id;
  next();
};

module.exports = {
  checkAuth
};
