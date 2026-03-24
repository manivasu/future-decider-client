import React from "react";
import { telugu } from "../../translations/telugu";

const DashaSection = ({ data }) => {
  if (!data || !data.analysis) {
    return <div className="empty-state">⏳ {telugu.noDataAvailable}</div>;
  }

  const analysis = data.analysis;

  return (
    <div className="section-container">
      <div className="card astro-card">
        <h2 className="astro-section-title">⏳ {telugu.dashaSystem}</h2>
        
        <div className="dasha-info">
          <p>
            {telugu.dashaSystem}ను ఎలా అర్థం చేసుకోవాలి: దశ విధానం (దశ-భుక్తి) ఎలాంటి సమయ కాలం అందో తెలియజేస్తుంది. 
            ఈ కాలంలో ఏ గ్రహం ఆధీనంలో ఉందో, ఆ గ్రహం ఎలాంటి ఫలితాలు ఇస్తాడో ఈ దశ తెలియజేస్తుంది.
          </p>
        </div>

        {analysis?.dasha ? (
          <div className="dasha-content">
            {analysis.dasha.currentPeriod && (
              <div className="dasha-period current">
                <h3>📍 {telugu.currentDashaPeriod}</h3>
                <div className="dasha-details">
                  <p><strong>{telugu.lord}:</strong> {analysis.dasha.currentPeriod.lord}</p>
                  <p><strong>{telugu.theme}:</strong> {analysis.dasha.currentPeriod.theme}</p>
                  {analysis.dasha.currentPeriod.duration && (
                    <p><strong>{telugu.duration}:</strong> {analysis.dasha.currentPeriod.duration}</p>
                  )}
                </div>
              </div>
            )}

            {analysis.dasha.progression && (
              <div className="dasha-progression">
                <h3>📊 {telugu.dashaProgression}</h3>
                <div className="progression-timeline">
                  {analysis.dasha.progression.map((period, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">
                        <strong>{period.lord || telugu.notAvailable}</strong>
                        <p>{period.theme || telugu.notAvailable}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.dasha.upcomingDashas && (
              <div className="upcoming-dasha">
                <h3>🚀 {telugu.upcomingDashas}</h3>
                <div className="upcoming-grid">
                  {analysis.dasha.upcomingDashas.map((dasha, idx) => (
                    <div key={idx} className="upcoming-item">
                      <p><strong>{dasha.lord || telugu.notAvailable}</strong></p>
                      <p className="dasha-theme">{dasha.theme}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>{telugu.noDashaData}</p>
        )}
      </div>
    </div>
  );
};

export default DashaSection;
