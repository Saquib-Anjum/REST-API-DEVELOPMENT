import {User} from '../../models/index.js'
import customErrorHandler from '../../services/customErrorHandler.js'
const userController = {
    async me(req, res, next) {
       //logic
       try{
const user = await User.findOne({_id:req.user._id})
if(!user){
    return next(customErrorHandler.notFound())
}
res.json(user)
       }catch(err){
return next(err);
       } 
    }
}
export default userController;