const express = require('express')
const { SignIn, SignUp } = require('../controllers/auth')
const router = express.Router()

router.route('/sign-in').post(SignIn)
router.route('/sign-up').post(SignUp)

module.exports = router