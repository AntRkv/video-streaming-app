import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  filePath: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", VideoSchema);
