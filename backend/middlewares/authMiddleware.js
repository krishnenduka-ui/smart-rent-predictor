import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


export const protect = (req,res,next)=>{
    let token 
    if(req.headers.authorization){
       token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return res.json({error:"You are not authenticated"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.json({error:"Invalid token"})
    }
    req.user = decoded
    next()
}


export const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.json({ error: "Not authenticated" })
    }

    if (req.user.role !== role) {
      return res.json({ error: "You are not authorized to access this page" })
    }

    next()
  }
}