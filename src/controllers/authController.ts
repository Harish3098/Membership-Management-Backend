import jwt from "jsonwebtoken"

export const login = (req:any,res:any)=>{

 const {username,password}=req.body

 if(
  username===process.env.ADMIN_USER &&
  password===process.env.ADMIN_PASSWORD
 ){

 const token = jwt.sign(
  {user:username},
  process.env.JWT_SECRET!,
  {expiresIn:"12h"}
 )

 return res.json({token})

 }

 res.status(401).json({message:"Invalid login"})

}