import express from "express";
import multer from "multer";
import Member from "../models/Member";
import { upload } from "../middleware/upload";
import { deleteMember } from "../controllers/memberController";

const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { name, barcode, email, phone, photo } = req.body;

//     const member = await Member.create({
//       name,
//       barcode,
//       email,
//       phone,
//       photo, // ✅ store base64 directly
//     });

//     res.json(member);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating member" });
//   }
// });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, barcode, email, phone } = req.body;

    const photoPath = req.file ? `uploads/${req.file.filename}` : "";

    const member = await Member.create({
      name,
      barcode,
      email,
      phone,
      photo: photoPath,
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Error creating member" });
  }
});


router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

router.delete("/:memberId", deleteMember);

export default router;