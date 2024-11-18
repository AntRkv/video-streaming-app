import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './routes/authRoute.mjs'
import connectDB from "./config/db.mjs"

dotenv.config();
const app = express();


// MongoDB Connection
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


//Single endpoint just to test API. Send data to browser
app.get('/', (req, res) => res.send('API Running'));


// Routes
app.use("/api/auth", authRoute);
// app.use("/api/videos", require("./routes/videos"));
// app.use("/api/shorts", require("./routes/shorts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
