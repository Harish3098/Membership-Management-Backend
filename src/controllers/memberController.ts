import Member from "../models/Member"
import EntryLog from "../models/EntryLog"
import fs from "fs";
import path from "path";

export const createMember = async(req:any,res:any)=>{

 const member = new Member({
  
  name:req.body.name,
  email:req.body.email,
  phone:req.body.phone,
  barcode:req.body.barcode,
  photo:req.file?.filename

 })

 await member.save()

 res.json(member)

}

export const deleteMember = async (req: any, res: any) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(400).json({ message: "Member ID is required" });
    }

    // 1. Find the member first
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // 2. Delete the photo file (if exists)
    if (member.photo) {
      const filePath = path.join(__dirname, "../../uploads", member.photo);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Failed to delete image:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    // 3. Delete the member from DB
    await Member.findByIdAndDelete(memberId);

    res.json({ message: "Member and photo deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMembers = async(req:any,res:any)=>{

 const page=parseInt(req.query.page)||1
 const limit=10
 const search=req.query.search||""

 const query={

  name:{$regex:search,$options:"i"}

 }

 const members=await Member.find(query)
 .skip((page-1)*limit)
 .limit(limit)

 const total=await Member.countDocuments(query)

 res.json({

  data:members,
  pages:Math.ceil(total/limit)

 })

}


export const scanMember = async(req:any,res:any)=>{

 const code=req.params.code

 const member=await Member.findOne({barcode:code})

 if(!member){
  return res.status(404).json({message:"Member not found"})
 }

 await EntryLog.create({

  member:member._id,
  barcode:code

 })

 res.json(member)

}