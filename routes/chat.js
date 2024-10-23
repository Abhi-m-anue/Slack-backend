const express = require('express')
const { getChats } = require('../controllers/chats')
const router = express.Router()

router.route('/').get(getChats)

module.exports = router