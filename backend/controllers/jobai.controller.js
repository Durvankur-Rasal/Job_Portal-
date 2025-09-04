import axios from "axios";

export const generateJobDescription = async (req, res) => {
    const { title, requirements } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `You are an expert HR assistant. Given the job title and requirements below, generate a detailed, professional job description suitable for a job portal.\n\nJob Title: ${title}\nRequirements: ${requirements}\n\nJob Description:`;
    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": apiKey
                }
            }
        );
        const description = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        res.json({ description });
    } catch (error) {
        console.error("Gemini Job Description error:", error?.response?.data || error.message);
        res.status(500).json({ description: "", error: "Failed to generate job description." });
    }
};
