import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D"],
  },
  firstPart: {
    type: String,
    required: true,
    match: /^\d{3}[A-C]$/, // Only Nandu codes (244A, 312B, etc.)
    refPath: "Nandu",
  },
  secondPart: {
    type: String,
    required: true,
    match: /^(\d{3}[A-C]|[0-9]{1,2})$/, // Nandu codes or static numbers (1, 2, etc.)
    refPath: "secondPartType",
  },
  secondPartType: {
    type: String,
    required: true,
    enum: ["Nandu", "StaticConnection"],
  },
  style: {
    type: String,
    required: true,
    enum: ["Northern", "Southern", "Taichi"],
  },
  difficultyValue: {
    type: Number,
    min: 0.1,
    max: 0.25,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  firstElement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nandu",
  },
  secondElement: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "secondPartType",
  },
});

// Compound indexes
connectionSchema.index({ firstPart: 1, secondPart: 1, style: 1 }, { unique: true });
connectionSchema.index({ style: 1, grade: 1 });

export default mongoose.model("Connection", connectionSchema);
