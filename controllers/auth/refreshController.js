import Joi from 'joi'
const refreshController={
async refresh(req,res,next){
//validate request 
const refreshTokenSchema = Joi.object({
    token: Joi.string().required().unique(),
    
  });
  const {error} = refreshTokenSchema.validate(req.body);

  if(error){
    return next(error);
  }
  //database checking 
  
}
}
export default refreshController;