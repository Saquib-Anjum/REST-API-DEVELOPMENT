import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT SECRET",JWT_SECRET);
import jwt from 'jsonwebtoken'
class JwtService {

    static sign(payload,expiry='60s' , secret=JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static verify(token, secret=JWT_SECRET){
        return jwt.verify(token,secret)
    }
}

export default JwtService;