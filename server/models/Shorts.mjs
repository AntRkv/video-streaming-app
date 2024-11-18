import mongoose from "mongoose";

const ShortSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  filePath: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Short", ShortSchema);
