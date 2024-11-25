import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoRoutes from "./backend/routes/videoRoutes.mjs";
import connectDB from "./backend/config/db.mjs";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/videos", videoRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
