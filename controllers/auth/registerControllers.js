import Joi from 'joi';
import customErorHandler from '../../services/customErrorHandler.js';
import JwtService from '../../services/JwtService.js';

import { User ,RefreshToken} from '../../models/index.js';
import bcrypt from 'bcrypt';
const REFRESH_SECRET=process.REFRESH_SECRET;
const JWT_SECRET=process.JWT_SECRET;
const registerController = {
    async register(req, res, next) {
        // Validation using Joi
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,20}$/).required(),
            repeat_password: Joi.ref('password')
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        // Check if user already exists
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(customErorHandler.alreadyExist('This email is already exist/taken'));
            }
        } catch (err) {
            return next(err);
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        let access_token;
        let refresh_token;
        try {
            const result = await newUser.save();
            //console.log(result);

            // Generate JWT token:access token 
            access_token = JwtService.sign({ _id: result._id, role: result.role,JWT_SECRET });
            //refreh token 
            refresh_token=JwtService.sign({_id: result._id, role: result.role},'1y',REFRESH_SECRET)
            //adding this refresh token into DB
            await RefreshToken.create({token:refresh_token})

           // console.log(access_token)
        } catch (err) {
            return next(err);
        }

        // Send the access token in the response
        res.json({
            access_token: access_token,
            refresh_token:refresh_token
        });
    }
};

export default registerController;
