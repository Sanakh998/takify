const bcrypt = require('bcrypt');
const CustomError = require('./customError');

const saltRounds = 10; // You can adjust the salt rounds for your security requirements

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new CustomError('Error hashing password');
  }
};

/**
 * Compares a plain password with a hashed password.
 * @param {string} password - The plain password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} True if the passwords match, false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new CustomError('Error comparing passwords');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
