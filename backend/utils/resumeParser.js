import axios from "axios";
import fs from "fs";

export const parseResumeAndScore = async (filePath) => {
    const text = fs.readFileSync(filePath, "utf-8");
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `
You are a resume parser. 
Given the following resume text, extract the candidate's name, email, skills, experience, and education. 
Then, score the resume out of 100 based on skills, experience, and education.
Return ONLY a valid JSON object in this format:
{
  "name": "",
  "email": "",
  "skills": [],
  "experience": "",
  "education": "",
  "score": 0
}
Resume:
${text}
`;

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

    let aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log("Gemini raw response:", aiText);

    // Remove markdown code block formatting if present
    if (aiText.startsWith("```json")) {
        aiText = aiText.replace("```json", "").replace("```", "").trim();
    } else if (aiText.startsWith("```")) {
        aiText = aiText.replace("```", "").replace("```", "").trim();
    }

    let parsed;
    try {
        parsed = JSON.parse(aiText);
    } catch (e) {
        console.error("Failed to parse Gemini JSON:", e, aiText);
        parsed = {};
    }
    return parsed;
};