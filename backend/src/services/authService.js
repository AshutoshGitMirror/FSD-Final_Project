const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signUserToken = (user) => (
  jwt.sign(
    { userId: user._id, fullName: user.fullName, std: user.std, board: user.board, role: user.role || 'student' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
);

const registerUser = async ({ fullName, email, password, std, board }) => {
  if (!fullName || !email || !password || !std || !board) {
    const error = new Error('Please provide all required fields');
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error('Please provide a valid email address');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already exists with this email');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email, password: hashedPassword, std, board });

  return {
    message: 'Registered successfully',
    token: signUserToken(user)
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const isMatch = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 400;
    throw error;
  }

  return {
    message: 'Login successful',
    token: signUserToken(user)
  };
};

module.exports = {
  registerUser,
  loginUser
};
