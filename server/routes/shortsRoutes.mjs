import express from "express";
import multer from "multer";
import fs from "fs";
import Short from "../models/Shorts.mjs";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/shorts"); // Fixed the relative path
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(
      /\s+/g,
      "_"
    )}`;
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

// Upload a new short
router.post("/upload", upload.single("short"), async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No short video uploaded" });
    }

    const newShort = new Short({
      title,
      description,
      category,
      filePath: req.file.path,
    });

    await newShort.save();
    res
      .status(201)
      .json({ msg: "Short uploaded successfully", short: newShort });
  } catch (err) {
    console.error("Error during short upload:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all shorts
router.get("/", async (req, res) => {
  try {
    const shorts = await Short.find();
    res.status(200).json(shorts);
  } catch (err) {
    console.error("Error fetching shorts:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get a single short by ID
router.get("/:id", async (req, res) => {
  try {
    const short = await Short.findById(req.params.id);
    if (!short) {
      return res.status(404).json({ msg: "Short not found" });
    }
    res.status(200).json(short);
  } catch (err) {
    console.error("Error fetching short by ID:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Delete a short
router.delete("/:id", async (req, res) => {
  try {
    const short = await Short.findById(req.params.id);
    if (!short) {
      return res.status(404).json({ msg: "Short not found" });
    }

    // Check if file exists before deleting
    fs.access(short.filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log("File path from database:", short.filePath);

        console.error("File not found:", short.filePath);
        return res.status(404).json({ msg: "File not found on the server" });
      }

      // Delete the file
      fs.unlink(short.filePath, async (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr.message);
          return res
            .status(500)
            .json({ msg: "Error deleting file", error: unlinkErr.message });
        }

        // Delete the database record
        await short.deleteOne();
        res.status(200).json({ msg: "Short deleted successfully" });
      });
    });
  } catch (err) {
    console.error("Error deleting short:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
