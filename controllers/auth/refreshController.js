import Joi from 'joi'
const refreshController={
async refresh(req,res,next){
//validate request 
const refreshTokenSchema = Joi.object({
    token: Joi.string().email().unique(),
    
  });
}
}
export default refreshController;