import React from "react";
import { telugu } from "../../translations/telugu";

const YogasSection = ({ data }) => {
  if (!data || !data.analysis) {
    return <div className="empty-state">🌟 {telugu.noDataAvailable}</div>;
  }

  const analysis = data.analysis;

  return (
    <div className="section-container">
      <div className="card astro-card">
        <h2 className="astro-section-title">🌟 {telugu.yogasTitle}</h2>
        
        {analysis?.yogas ? (
          <div className="yogas-grid">
            <div className="yoga-category">
              <h3>✅ {telugu.benefic}</h3>
              {analysis.yogas.benefic && analysis.yogas.benefic.length > 0 ? (
                analysis.yogas.benefic.map((yoga, idx) => (
                  <div key={idx} className="yoga-item benefic">
                    <p><strong>{yoga.name || telugu.notAvailable}</strong></p>
                    <p>{yoga.description || yoga}</p>
                    {yoga.confidence && (
                      <p className="confidence">
                        {telugu.confidence}: {yoga.confidence}%
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>{telugu.noBeneficYogas}</p>
              )}
            </div>

            <div className="yoga-category">
              <h3>⚠️ {telugu.malefic}</h3>
              {analysis.yogas.malefic && analysis.yogas.malefic.length > 0 ? (
                analysis.yogas.malefic.map((yoga, idx) => (
                  <div key={idx} className="yoga-item malefic">
                    <p><strong>{yoga.name || telugu.notAvailable}</strong></p>
                    <p>{yoga.description || yoga}</p>
                    {yoga.confidence && (
                      <p className="confidence">
                        {telugu.confidence}: {yoga.confidence}%
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>{telugu.noMaleficYogas}</p>
              )}
            </div>
          </div>
        ) : (
          <p>{telugu.noDataAvailable}</p>
        )}
      </div>
    </div>
  );
};

export default YogasSection;
