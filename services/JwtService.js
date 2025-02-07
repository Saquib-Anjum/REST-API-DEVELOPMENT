const JWT_SECRET = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken'
class JwtService {

    static sign(payload,expiry='60s' , secret=JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
}

export default JwtService;