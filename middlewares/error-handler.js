const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.message || 'Some thing went wrong'
  }
  if(err.name === 'ValidationError'){
    customError.statusCode = 400
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
  }
  if(err.code && err.code === 11000){
    customError.statusCode = 400
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}`
  }
  if(err.name === 'CastError'){
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = 404
  }
  return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware