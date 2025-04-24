import mongoose from "mongoose";

const nanduSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    match: /^\d{3}[A-C]$/,
  },
  chinese: {
    type: String,
    required: true,
    trim: true,
  },
  pinyin: {
    type: String,
    required: true,
    trim: true,
  },
  englishDescription: {
    type: String,
    required: true,
  },
  techniqueType: {
    type: String,
    required: true,
    enum: ["Balance", "Leg", "Jumping", "Tumbling"],
  },
  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
    index: true,
  },
  style: {
    type: String,
    required: true,
    enum: ["Northern", "Southern", "Taichi"],
  },
  difficultyValue: {
    type: Number,
    min: 0.1,
    max: 0.4,
    required: true,
  },
  videoUrl: String,
  diagramUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for faster queries
nanduSchema.index({ code: 1, grade: 1, style: 1 }, { unique: true });

export default mongoose.model("Nandu", nanduSchema);
