import express from "express";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/protected-data", authenticate, (req, res) => {
  res.json({ data: "This is protected data" });
});

export default router;
