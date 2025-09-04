import axios from "axios";

export const generateJobDescription = async (title, requirements) => {
  const res = await axios.post("http://localhost:8000/api/v1/jobai/generate-description", {
    title,
    requirements
  });
  return res.data.description;
};
