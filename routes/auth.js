const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

const auth = require('../middleware/auth');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
    body('role').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login/admin', authController.login);

router.post('/login/agent', authController.loginAgent);

router.post('/login/user', authController.loginUser);

router.post('/authToken',auth)

module.exports = router;