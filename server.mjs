import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoRoutes from "./routes/videoRoutes.mjs";


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/videos", videoRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
