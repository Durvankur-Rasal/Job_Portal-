import { parseResumeAndScore } from "../utils/resumeParser.js";

export const uploadAndParseResume = async (req, res) => {
    try {
        const filePath = req.file.path;
        const parsedData = await parseResumeAndScore(filePath);
        res.json(parsedData);
    } catch (error) {
        console.error("Resume parsing error:", error);
        res.status(500).json({ message: "Failed to parse resume." });
    }
};