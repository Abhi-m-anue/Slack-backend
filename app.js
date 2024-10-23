const express = require('express')
const cors = require('cors')
require('express-async-errors');
require('dotenv').config()

const errorHandlerMiddleware = require('./middlewares/error-handler');

const connectDB = require('./DB/connect')

//routes
const authRouter = require('./routes/auth')

const app =  express()
app.use(express.json());
app.use(cors());

// app.get('/',(req,res)=>{
//     res.send('slack api')
// })
app.use('/api/v1/auth',authRouter)

app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 3000 ;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`server is listening in port ${PORT}...`)
        })
    }
    catch(err){
        console.log(err)
    }
   
}
 
start()
