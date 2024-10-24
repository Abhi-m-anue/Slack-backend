const express = require('express')
const http  = require('http')
const cors = require('cors')
require('express-async-errors');
require('dotenv').config()

const errorHandlerMiddleware = require('./middlewares/error-handler');
const authenticationMiddleware = require('./middlewares/authentication')

const connectDB = require('./DB/connect')
const setupSocket = require('./sockets/socket')

//routes
const authRouter = require('./routes/auth')
const channelRouter = require('./routes/channel')
const chatRouter = require('./routes/chat')


const app =  express()
const server = http.createServer(app)
//setup socket.io server
setupSocket(server)

app.use(express.json());

// const corsOptions = {
//     origin: 'http://localhost:5173', 
//     methods: ['GET', 'POST','PATCH','DELETE'], 
//     credentials: true, 
// };
app.use(cors());

app.get('/',(req,res)=>{
    res.send('slack api')
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/channels',authenticationMiddleware,channelRouter)
app.use('/api/v1/chats',authenticationMiddleware,chatRouter)

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000 ;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        server.listen(PORT,()=>{
            console.log(`server is listening in port ${PORT}...`)
        })
    }
    catch(err){
        console.log(err)
    }
   
}
 
start()
