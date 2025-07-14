import express from "express";
import { handleChat } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/", handleChat);

export default router;