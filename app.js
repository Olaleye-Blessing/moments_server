import express from "express";
import cors from "cors";

import momentRoutes from "./routes/moment.js";

const app = express();

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

app.use(cors());

app.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
    });
});

app.use("/moments", momentRoutes);

export { app };
