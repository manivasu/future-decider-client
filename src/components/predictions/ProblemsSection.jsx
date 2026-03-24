import React from "react";
import { telugu } from "../../translations/telugu";

// Severity translations
const severityTranslations = {
  high: telugu.high,
  medium: telugu.medium,
  low: telugu.low,
};

const getSeverity = (severity) => {
  return severityTranslations[severity?.toLowerCase()] || telugu.medium;
};

const ProblemsSection = ({ data }) => {
  if (!data || !data.analysis) {
    return <div className="empty-state">⚠️ {telugu.noDataAvailable}</div>;
  }

  const analysis = data.analysis;

  return (
    <div className="section-container">
      <div className="card astro-card">
        <h2 className="astro-section-title">⚠️ {telugu.realLifeChallenges}</h2>
        
        {analysis?.problems && Array.isArray(analysis.problems) && analysis.problems.length > 0 ? (
          <div className="problems-grid">
            {analysis.problems.map((problem, idx) => (
              <div key={idx} className="problem-card">
                <div className="problem-header">
                  <h3>{problem.area || telugu.notAvailable}</h3>
                  <span className={`severity ${problem.severity?.toLowerCase()}`}>
                    {getSeverity(problem.severity)}
                  </span>
                </div>
                
                <div className="problem-content">
                  {problem.detection && (
                    <div className="problem-item">
                      <strong>{telugu.detection}:</strong>
                      <p>{problem.detection}</p>
                    </div>
                  )}
                  
                  {problem.reason && (
                    <div className="problem-item">
                      <strong>{telugu.reason}:</strong>
                      <p>{problem.reason}</p>
                    </div>
                  )}
                  
                  {problem.timeline && (
                    <div className="problem-item">
                      <strong>{telugu.timeline}:</strong>
                      <p>{problem.timeline}</p>
                    </div>
                  )}
                  
                  {problem.solutions && (
                    <div className="problem-item solutions">
                      <strong>{telugu.solutions}:</strong>
                      <p>{problem.solutions}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{telugu.noProblemsDetected}</p>
        )}
      </div>
    </div>
  );
};

export default ProblemsSection;
