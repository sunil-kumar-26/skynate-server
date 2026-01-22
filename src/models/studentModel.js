const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isEmailVerified:{type:Boolean,default:false},
  },
  {
    timestamps: true,
  }
);

const studentInfo = mongoose.model("studentInfoColl", studentSchema);
module.exports = studentInfo;
