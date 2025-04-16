import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  chineseName: {
    type: String,
    required: [true, "Chinese name is required"],
    trim: true,
    maxlength: [50, "Chinese name cannot exceed 50 characters"],
  },
  englishName: {
    type: String,
    required: [true, "English name is required"],
    trim: true,
    maxlength: [100, "English name cannot exceed 100 characters"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add text index for search functionality
eventSchema.index({ name: "text", code: "text" });

export default mongoose.model("Event", eventSchema);
