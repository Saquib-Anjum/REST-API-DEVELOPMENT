import customErrorHandler from '../services/customErrorHandler.js'

import JwtService from '../services/JwtService.js'
const auth = async (req,res,next)=>{
let authHeader = req.headers.authorization
if(!authHeader){
    return next(customErrorHandler.unAuthorized())
}
const token = authHeader.split(" ")[1]
console.log("token: ",token);
try{
const {_id,role} = await JwtService.verify(token);
req.user={};
req.user._id = _id;
req.user.role = role;
next()
}catch(err){
return next(customErrorHandler.unAuthorized())
}
}
export default auth;