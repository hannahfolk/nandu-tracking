import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  chineseName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3,
  },
  pinyinName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  pinyinAcronym: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  code: {
    type: String,
    required: [true, "Event code is required"],
    unique: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z]{2}$/, "Event code must be exactly 2 uppercase letters"],
    minlength: [2, "Event code must be exactly 2 characters"],
    maxlength: [2, "Event code must be exactly 2 characters"],
  },
  style: {
    type: String,
    required: [true, "Style is required"],
    enum: ["Northern", "Southern", "Taichi"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

eventSchema.index({ code: 1, style: 1 });
eventSchema.index({ style: 1 });

export default mongoose.model("Event", eventSchema);
