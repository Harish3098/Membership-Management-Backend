// import express from "express";
// import Member from "../models/Member";
// import EntryLog from "../models/EntryLog";
// import { io } from "../server";

// const router = express.Router();

// router.get("/:code", async (req, res) => {
//   const member = await Member.findOne({ barcode: req.params.code });

//   if (!member) return res.status(404).json({ message: "Not found" });

//   await EntryLog.create({
//     member: member._id,
//     barcode: req.params.code,
//   });

//   io.emit("scan", member);

//   res.json(member);
// });

// export default router;

import express from "express";
import Member from "../models/Member";

const router = express.Router();

// POST /member/scan
// router.post("/", async (req, res) => {
//   try {
//     const { code } = req.body;
//       console.log(code);
//     if (!code) {
//       return res.status(400).json({ message: "Barcode is required" });
//     }

//     const member = await Member.findOne({ barcode: code });

//     if (!member) {
//       return res.status(404).json({ message: "Member not found" });
//     }

//     const data = member.toObject();

//     if (data.photo) {
//       data.photo = `http://localhost:5000/${data.photo}`;
//     }

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    const member = await Member.findOne({ barcode: code });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const data = member.toObject();

    // 🔥 convert to full URL
    if (data.photo) {
      data.photo = `http://localhost:5000/${data.photo}`;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;