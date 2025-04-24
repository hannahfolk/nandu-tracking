import mongoose from "mongoose";

const staticConnectionSchema = new mongoose.Schema({
  chinese: {
    type: String,
    required: [true, "Chinese name is required"],
    trim: true,
    maxlength: [50, "Chinese name cannot exceed 50 characters"],
  },
  pinyin: {
    type: String,
    required: [true, "Pinyin is required"],
    trim: true,
  },
  englishDescription: {
    type: String,
    required: [true, "English description is required"],
    trim: true,
  },
  englishName: {
    type: String,
    required: [true, "English name is required"],
    trim: true,
  },
  pinyinAcronym: {
    type: String,
    required: [true, "Pinyin acronym is required"],
    trim: true,
    uppercase: true,
  },
  code: {
    type: String,
    required: [true, "Code is required"],
    unique: true,
    match: [/^[0-9]{1,2}$/, "Code must be in format 0 to 99"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for faster queries
staticConnectionSchema.index({ code: 1 }, { unique: true });
staticConnectionSchema.index({ pinyinAcronym: 1 });

export default mongoose.model("StaticConnection", staticConnectionSchema);
