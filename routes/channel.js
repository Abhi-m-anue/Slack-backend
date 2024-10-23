const express = require('express')
const { getAllChannels, createChannel, editChannel } = require('../controllers/channel')
const router = express.Router()

router.route('/').get(getAllChannels).post(createChannel)
router.route('/:id').patch(editChannel)

module.exports = router