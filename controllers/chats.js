const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes')
const Chats = require('../models/chats')

const getChats = async(req,res)=>{
    const channelId = req.query.channelId
    if(!channelId){
        throw new BadRequestError('Channel does not exist')
    }
    const chats = await Chats.find({ channelId : channelId }).sort({ createdAt : 1});
    res.status(StatusCodes.OK).json({chats,count: chats.length})
}

module.exports = {
    getChats
}