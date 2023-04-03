const { body } = require('express-validator');
const express = require('express');
const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');

const post = require('../middleware/post');

const router = express.Router();

const db = require('../util/database');

router.get('/admin', auth, postsController.fetchAll);

router.get('/admin/:id', postsController.getOne);

router.post(
  '/create',
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
  ],auth,postsController.postPost
  );

router.delete('/delete/:id', auth, postsController.deletePost);
//router.put('/:id', auth, postsController.putPost); 


router.put('/update/:id',auth, postsController.putPost);

module.exports = router;

router.post(
  '/agent',
  [
    body('role').trim().not().isEmpty(),
    body('username').trim().isLength({ min: 5 }).not().isEmpty(),
    body('password').trim().isLength({ min: 7 }),
    body('active').trim().isLength({ min: 7 }),
    body('credit').trim().isLength({ min: 7 }),
    body('adminID').trim().not().isEmpty(),
  ],postsController.postAgent
  );
  router.get('/agent', auth, postsController.fetchAllAgent);
  router.get('/agent/:id', auth, postsController.getOneAgent);
  router.put('/updateAgent/:id', auth, postsController.putPostAgent);

  router.post(
    '/user',
    [
      body('username').trim().isLength({ min: 5 }).not().isEmpty(),
      body('password').trim().isLength({ min: 7 }),
      body('active').trim().isLength({ min: 7 }),
      body('balance').trim().isLength({ min: 7 }),
      body('idCreate').trim().not().isEmpty(),
      body('roleCreate').trim().not().isEmpty()
    ],auth, postsController.postUser
    );

  router.get('/user',auth, postsController.fetchAllUser);
  router.get('/user/:id', auth, postsController.getOneUser);
  router.put('/updateUser/:id', auth, postsController.putPostUser);
  
  router.post('/user/balance/:id',auth, postsController.postBalance);
  router.post('/agent/credit/:id',auth, postsController.postCredit);

  router.post('/token',post, postsController.checkToken);


  router.get('/test', postsController.test);
