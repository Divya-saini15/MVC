const UserAuth = require('../models/UserAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = process.env.JWT_SECRET; // Assuming you've set JWT_SECRET in your environment variables


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserAuth.findOne({ username });
    //Match username
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    //Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    //check the jwt key 
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable not set');
      process.exit(1);
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.renderLoginPage = (req, res) => {
  res.render('login');
};