const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

const generateOtp=()=>{
    const otp = Math.floor(1000 + Math.random()*9000)
    const otp_expiry_date= new Date();
    otp_expiry_date.setTime(new Date().getTime()+ 30 * 60 * 1000)
    return {otp,otp_expiry_date};
}
  

const verifyToken = async(token)=>{
    try {
        const verified = jwt.verify(token,JWT_SECRET_KEY)
        return verified
    } catch (error) {
   console.log(error)
    }
}



const generateToken = async (id)=>{
    try {
        const verified = jwt.sign({id},JWT_SECRET_KEY,{expiresIn:"30mins"})
        return verified
    } catch (error) {
     console.log(error)
    }
}
const generateLoginToken = async (id)=>{
    try {
        const verified = jwt.sign({id},JWT_SECRET_KEY,{expiresIn:"3d"})
        return verified
    } catch (error) {
     console.log(error)
    }
}


module.exports={generateOtp,generateToken,verifyToken}
