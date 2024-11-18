import express from "express";
import multer from "multer";
import fs from "fs";
import Video from "../models/Video.mjs";

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/videos";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files are allowed"), false);
    }
    cb(null, true);
  },
});

// Upload a new video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No video file uploaded" });
    }

    const newVideo = new Video({
      title,
      description,
      category,
      filePath: req.file.path,
    });

    await newVideo.save();
    res
      .status(201)
      .json({ msg: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get a single video by ID
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }
    res.status(200).json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a video
router.delete("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    // Delete video file from disk
    fs.unlink(video.filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    await video.remove();
    res.status(200).json({ msg: "Video deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
