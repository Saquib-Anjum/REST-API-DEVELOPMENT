import Joi from 'joi';
import customErorHandler from "../../services/customErrorHandler.js";
import { User, RefreshToken } from '../../models/index.js';
import JwtService from '../../services/JwtService.js';

const REFRESH_SECRET = process.env.REFRESH_SECRET;

const refreshController = {
  async refresh(req, res, next) {
    // Validate request
    const refreshTokenSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      // Check if the refresh token exists in the database
      const refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
      console.log(refreshtoken);
      
      if (!refreshtoken) {
        return next(customErorHandler.unAuthorized('Invalid refresh token'));
      }

      let userId;
      try {
        const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
        userId = _id;
    } catch(err) {
        return next(customErorHandler.unAuthorized('Invalid refresh token secret '));
    }
      //console.log("id hai bahi :",_id)
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(customErorHandler.unAuthorized('No user found'));
      }

      // Remove the old refresh token to prevent reuse
      await RefreshToken.deleteOne({ token: req.body.refresh_token });

      // Generate new access and refresh tokens
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);

      // Save the new refresh token in the database
      await RefreshToken.create({ token: refresh_token });

      // Return the new tokens to the client
      res.json({ access_token:access_token, refresh_token : refresh_token });

    } catch (err) {
      return next(new Error('Something went wrong: ' + err.message));
    }
  },
};

export default refreshController;
