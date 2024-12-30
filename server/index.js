import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes//postRoutes.js";
import dalleRoutes from "./routes//dalleRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

// Handle preflight requests explicitly for /api/v1/dalle
app.options("/api/v1/dalle", cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("hello from DELL-E!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
