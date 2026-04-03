import mongoose from "mongoose";

const EntryLogSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  barcode: String,
}, { timestamps: true });

export default mongoose.model("EntryLog", EntryLogSchema);