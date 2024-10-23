const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide name'],
    },
})

module.exports = mongoose.model('Channel',channelSchema)