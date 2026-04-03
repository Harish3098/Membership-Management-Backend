import jwt from "jsonwebtoken"

export const verifyToken = (req:any,res:any,next:any)=>{

 const auth=req.headers.authorization

 if(!auth) return res.sendStatus(401)

 const token=auth.split(" ")[1]

 try{

 const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET!
 )

 req.user=decoded

 next()

 }catch{

 res.sendStatus(403)

 }

}