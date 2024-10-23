const { Server } = require('socket.io')
const Chats = require('../models/chats')

const setupSocket = (server)=>{
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173', 
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {

        socket.on('joinChannel',(userId,channelId)=>{
            socket.join(channelId);
        })

        socket.on('sendMessage',async(senderName,senderId,channelId,text)=>{
            //save message in database
            const message = await Chats.create({senderName : senderName, senderId : senderId, channelId : channelId, text : text})
            // console.log(senderName,senderId,channelId,text)
            const createdAt = new Date();
            io.to(channelId).emit('receiveMessage',senderName,senderId,createdAt,text)

        })
    });
}

module.exports = setupSocket