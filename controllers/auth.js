const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const email = req.body.email; //รับDataจากForm
  const password = req.body.password; //รับDataจากForm
  const role = req.body.role; //รับDataจากForm

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      email: email,
      password: hashedPassword,
      role: role,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);
    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];
    const passwordMatches = await bcrypt.compare(password, storedUser.password);
    
    if (!passwordMatches ) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        role: storedUser.role
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, data: storedUser});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 
  try {
    const user = await User.find(email);
    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const storedUser = user[0][0];
    const passwordMatches = await bcrypt.compare(password, storedUser.password);
    
    if (!passwordMatches ) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        role: storedUser.role
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, data: storedUser});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.loginAgent = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const user = await User.findAgent(username);
    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const storedUser = user[0][0];
    const passwordMatches = await bcrypt.compare(password, storedUser.Password);
    
    if (!passwordMatches ) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    
    const token = jwt.sign(
      {
        username: storedUser.Username,
        userId: storedUser.ID,
        role: storedUser.Role
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, data: storedUser});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findUser(email);
    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];
    const passwordMatches = await bcrypt.compare(password, storedUser.password);
    
    if (!passwordMatches ) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        role: storedUser.role
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, data: storedUser});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};