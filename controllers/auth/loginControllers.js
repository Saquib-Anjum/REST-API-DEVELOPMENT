import Joi from "joi";
import customErorHandler from "../../services/customErrorHandler.js";
import JwtService from '../../services/JwtService.js';
import bcrypt from 'bcrypt';
import {User,RefreshToken} from '../../models/index.js'
const REFRESH_SECRET= process.env.REFRESH_SECRET;
const loginController = {
  async login(req, res, next) {
    //validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/)
        .required(),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    //console.log(req.body.email);
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(customErorHandler.wrongCrdentials());
      }
      //comapre password;
      const match =await bcrypt.compare(req.body.password,user.password);
      if(!match){
        return next(customErorHandler.wrongCrdentials())
      }
      //token generation here;
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      console.log(access_token)
      //refresh token 
      const refresh_token=JwtService.sign({_id: result._id, role: result.role},'1y',REFRESH_SECRET)
      //adding this refresh token into DB
        await RefreshToken.create({token:refresh_token})
      //sending to the clinet
      res.json({
        access_token:access_token,
        refresh_token:refresh_token 
     })


    } catch (err) {
        return next(err);
    }

    
    
  },
};
export default loginController;
