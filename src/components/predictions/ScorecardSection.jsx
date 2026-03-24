import React from "react";
import { telugu } from "../../translations/telugu";

// Area name translations
const areaTranslations = {
  career: telugu.career,
  relationships: telugu.relationships,
  finances: telugu.finances,
  health: telugu.health,
  spirituality: telugu.spirituality,
  creativity: telugu.creativity,
  family: telugu.family,
  overall: telugu.overall,
};

const getAreaName = (area) => {
  return areaTranslations[area] || area.charAt(0).toUpperCase() + area.slice(1);
};

const ScorecardSection = ({ data }) => {
  if (!data || !data.analysis) {
    return <div className="empty-state">📊 {telugu.noDataAvailable}</div>;
  }

  const analysis = data.analysis;

  return (
    <div className="section-container">
      <div className="card astro-card">
        <h2 className="astro-section-title">📊 {telugu.scorecard}</h2>
        
        {analysis?.scorecard ? (
          <div className="scorecard-grid">
            {Object.entries(analysis.scorecard).map(([area, score]) => (
              <div key={area} className="scorecard-item">
                <div className="scorecard-label">
                  {getAreaName(area)}
                </div>
                <div className="scorecard-score">
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="score-number">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{telugu.noDataAvailable}</p>
        )}
      </div>
    </div>
  );
};

export default ScorecardSection;
