import express from "express";
import { generateJobDescription } from "../controllers/jobai.controller.js";

const router = express.Router();

router.post("/generate-description", generateJobDescription);

export default router;
