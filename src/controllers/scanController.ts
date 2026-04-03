import { Request, Response } from "express";
import Member from "../models/Member";
import EntryLog from "../models/EntryLog";
import { io } from "../server";

export const handleScan = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Barcode required" });
    }
    // 🔍 Find member
    const member = await Member.findOne({ barcode: code });
    console.log(member)
    
    if (!member) {
      io.emit("scan-error", { message: "Member not found", code });
      return res.status(404).json({ message: "Member not found" });
    }

    // 🔄 Get last scan
    const lastLog = await EntryLog.findOne({ member: member._id })
      .sort({ createdAt: -1 });

    // 📝 Create log (✅ FIXED FIELD)
    const log = await EntryLog.create({
      member: member._id, // ✅ correct field
      barcode: code
    });

    const payload = {
      member,
      log,
    };

    // 📡 Emit success
    io.emit("scan-success", payload);

    res.json(payload);
  } catch (error) {
    console.error("Scan Error:", error);
    res.status(500).json({ message: "Scan failed" });
  }
};