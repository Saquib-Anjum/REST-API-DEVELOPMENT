import Joi from 'joi';
import customErorHandler from '../../services/customErrorHandler.js';
const registerController = {
    async register(req, res, next) {
        //Validation using Joi
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/).required(),
            repeat_password: Joi.string().pattern(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/).required(),
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        //chech if user in the database 
        try{
            const exist = await User.exists({email:req.body.email})
            if(exist){
                return next(customErorHandler.alreadyExist('This email is already exist/taken'));
            }
        }catch(err){
           return next(err);
        }
        // here we send message
        res.json({
          message:"Registration successful!",
          name:req.body.name,
          email:req.body.email
        });
    },
};

export default registerController;
