const Channel = require('../models/channel')
const { StatusCodes } = require('http-status-codes')

const createChannel = async(req,res)=>{
    const channel = await Channel.create({...req.body});
    res.status(StatusCodes.CREATED).json({channel})
}

const editChannel = async(req,res)=>{
    
}

const getAllChannels = async(req,res)=>{
    const channels = await Channel.find();
    res.status(StatusCodes.OK).json({channels,count: channels.length})
}

module.exports = {
    createChannel, editChannel, getAllChannels
}