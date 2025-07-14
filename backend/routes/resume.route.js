import express from "express";
import multer from "multer";
import { uploadAndParseResume } from "../controllers/resume.controller.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("resume"), uploadAndParseResume);

export default router;