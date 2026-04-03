import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const uri = process.env.MONGO_URI!;
mongoose.connect(uri).then(() => console.log("MongoDB Connected"));

// Routes
import memberRoutes from "./routes/memberRoutes";
import scanRoutes from "./routes/scanRoutes";

app.use("/api/members", memberRoutes);
app.use("/api/scan", scanRoutes);



io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});