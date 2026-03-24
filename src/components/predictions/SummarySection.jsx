import React from "react";
import { telugu } from "../../translations/telugu";

const SummarySection = ({ data }) => {
  if (!data || !data.analysis) {
    return <div className="empty-state">📊 {telugu.noDataAvailable}</div>;
  }

  const analysis = data.analysis;
  const chart = data.chart;

  return (
    <div className="section-container">
      <div className="vedic-header">
        <p>{telugu.vedasSource}</p>
      </div>

      <div className="chart-overview">
        <div className="chart-header">
          <h2 className="astro-section-title">{telugu.chartDetails}</h2>
        </div>
        <div className="chart-info-box">
          <div className="info-row">
            <div className="info-col">
              <label className="astro-section-title">{telugu.date}</label>
              <p>{chart?.date}</p>
            </div>
            <div className="info-col">
              <label className="astro-section-title">{telugu.time}</label>
              <p>{chart?.time}</p>
            </div>
            <div className="info-col">
              <label className="astro-section-title">{telugu.place}</label>
              <p>{chart?.place}</p>
            </div>
          </div>
          <div className="zodiac-highlights">
            <div className="highlight-box">
              <div className="zodiac-label">{telugu.moonSignRashi}</div>
              <div className="zodiac-value">{chart?.rashi || "—"}</div>
            </div>
            <div className="highlight-box">
              <div className="zodiac-label">{telugu.moonNakshatra}</div>
              <div className="zodiac-value">{chart?.nakshatra || "—"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Content */}
      <div className="card astro-card">
        <h2 className="astro-section-title">✨ {telugu.summary}</h2>
        
        {analysis?.summary && (
          <div className="summary-content">
            <div className="summary-item">
              <h4>{telugu.overallTone}</h4>
              <p>{analysis.summary.overallTone || telugu.analysisPending}</p>
            </div>

            {analysis.summary.strengths && (
              <div className="summary-item">
                <h4>{telugu.strengths}</h4>
                <p>{analysis.summary.strengths}</p>
              </div>
            )}

            {analysis.summary.challenges && (
              <div className="summary-item">
                <h4>{telugu.challenges}</h4>
                <p>{analysis.summary.challenges}</p>
              </div>
            )}

            {analysis.summary.opportunities && (
              <div className="summary-item">
                <h4>{telugu.opportunities}</h4>
                <p>{analysis.summary.opportunities}</p>
              </div>
            )}

            {analysis.summary.nextSteps && (
              <div className="summary-item">
                <h4>{telugu.nextSteps}</h4>
                <p>{analysis.summary.nextSteps}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarySection;
