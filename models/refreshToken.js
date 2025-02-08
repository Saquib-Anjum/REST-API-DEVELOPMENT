import mongoose from 'mongoose';

//const Schema = mongoose.Schema;

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
       unique:true
    },
    
}, { timestamps: false }); // Correct option is `timestamps` not `timestamp`

export default mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens');
