import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './routes/authRoute.mjs'
import connectDB from "./config/db.mjs"
import videosRoutes from "./routes/videosRoutes.mjs"

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

app.use("/api/auth", authRoute);
app.use("/api/videos", videosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
