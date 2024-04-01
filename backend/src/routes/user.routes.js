const express = require('express');
const { signIn, signUp } = require('../controllers/user.controllers');

const router = express.Router();

/**
 * @desc Create a new account
 * @route /api/v1/users
 * @method POST
 * @access public
*/
router.post('/sign-up', signUp);

/**
 * @desc Login to an existing account
 * @route /api/v1/users
 * @method POST
 * @access public
*/
router.post('/sign-in', signIn);

module.exports = router;