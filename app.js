import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import momentRoutes from "./routes/moment.js";
import authenticationRoutes from "./routes/users.js";
import commentRoutes from "./routes/comment.js";
import { parseCookie } from "./utility/parseCookie.js";
import { globalErrorHandler } from "./controllers/error.js";

const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

// app.use(cors());

app.use(
    cors({
        origin:
            process.env.NODE_ENV.trim() === "development"
                ? "http://localhost:3000"
                : "https://momentss.netlify.app",
        credentials: true,
    })
);

// app.use(helmet());

app.use(parseCookie);

// app.use(cookieParser());

app.use("/moments", momentRoutes);
app.use("/auth", authenticationRoutes);
app.use("/comments", commentRoutes);

app.use(globalErrorHandler);
export { app };
