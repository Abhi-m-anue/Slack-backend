const express = require('express')
require('dotenv').config()

const connectDB = require('./DB/connect')

//routes
const authRouter = require('./routes/auth')

const app =  express()
app.use(express.json())

app.use('api/v1/auth',authRouter)

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
