import axios from "axios";

export const handleChat = async (req, res) => {
    console.log("handleChat called", req.body); // <--- Add this line
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [{ parts: [{ text: message }] }]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": apiKey
                }
            }
        );

        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";
        res.json({ reply });
    } catch (error) {
        if (error.response) {
            console.error("Gemini API error:", error.response.status, error.response.data);
        } else {
            console.error("Gemini API error:", error.message);
        }
        res.status(500).json({ reply: "Sorry, something went wrong with the chatbot." });
    }
};