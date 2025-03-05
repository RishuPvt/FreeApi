import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "https://backend-hub.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use(express.static("public"));

app.use(cookieParser());

import UserRouter from "../Backend/Src/Routes/User.Routes.js";

app.use("/api/v1/users", UserRouter);

import ProjectRouter from "../Backend/Src/Routes/Project.Routes.js";

app.use("/api/v1/projects", ProjectRouter);

export { app };
