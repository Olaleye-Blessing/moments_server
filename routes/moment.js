import express from "express";

import {
    createMoment,
    deleteMoment,
    getMoments,
    updateMoment,
} from "../controllers/moment.js";

const router = express.Router();

router.get("/", getMoments);
router.post("/", createMoment);
router.patch("/:id", updateMoment);
router.delete("/:id", deleteMoment);

export default router;
