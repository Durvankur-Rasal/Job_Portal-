import React from "react";

const ResumeScore = ({ score, parsedData }) => (
  <div>
    <h3>Resume Score: {score || 0}/100</h3>
    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
  </div>
);

export default ResumeScore;