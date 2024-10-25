const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const { unAuthenticatedError } = require('../errors')

const SignIn = async(req, res)=>{
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(!user){
        throw new unAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new unAuthenticatedError('Incorrect password')
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name, userId : user._id},token})
}

const SignUp = async(req,res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.name, userId : user._id},token})
}

module.exports = {
    SignIn, SignUp
}