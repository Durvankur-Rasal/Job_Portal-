import React, { useState } from "react";
import { Upload } from "lucide-react";
import Navbar from "../shared/Navbar";

const ResumeUpload = () => {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:8000/api/v1/resume/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setScoreData(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Resume Parser & Scorer</h2>
          <p className="text-gray-600">
            Upload your resume to get an AI-powered analysis
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
          <input
            type="file"
            id="resume"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleUpload}
          />
          <label
            htmlFor="resume"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <Upload size={48} className="text-gray-400" />
            <div>
              <p className="font-medium">
                {fileName || "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, DOCX or TXT (max. 5MB)
              </p>
            </div>
          </label>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Analyzing your resume...</p>
          </div>
        )}

        {scoreData && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Resume Analysis</h3>
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{scoreData.score}/100</span>
                </div>
                {/* Circular progress */}
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 45 * (1 - scoreData.score / 100)
                    }`}
                    className="text-blue-600"
                  />
                </svg>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name & Email */}
              <div className="space-y-2">
                <h4 className="font-semibold">Personal Info</h4>
                <p>Name: {scoreData.name || "Not found"}</p>
                <p>Email: {scoreData.email || "Not found"}</p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {scoreData.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2">Experience</h4>
                <p className="whitespace-pre-wrap">{scoreData.experience}</p>
              </div>

              {/* Education */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="whitespace-pre-wrap">{scoreData.education}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumeUpload;