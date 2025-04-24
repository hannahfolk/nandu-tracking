import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Set strictQuery before connecting
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nandu-tracking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
