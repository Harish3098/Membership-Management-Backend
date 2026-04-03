import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  barcode: {
    type: String,
  required: true,
  unique: true
  },
  photo: String,
}, { timestamps: true });

MemberSchema.plugin(AutoIncrement, { inc_field: 'memberId' });

export default mongoose.model("Member", MemberSchema);