const jwt = require("jsonwebtoken")
const { User } = require("../models/User")
const { verifyToken } = require("../utils/utils")
const JWT_SECRET_KEY =process.env.JWT_SECRET_KEY

const auth =async(req,res,next)=>{
    try {
    const authHeader = req.headers.authorization
   
    const token = authHeader.split(" ")[1]
    if(!token)
        return res.status(404).json({Error:"Kindly Login"})
    const verified = await verifyToken(token)
    if(!verified) return res.status(401).json({Error:"Invalid Token"})
    const{id}=verified;

    const user = await User.findById({_id:id})
    if(!user) return res.status(404).json({Error:"User not found"})
    req.user = verified
    next()
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal Server Error"})
    }
}

module.exports={auth}