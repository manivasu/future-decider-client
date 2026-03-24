import React from "react";
import { telugu } from "../../translations/telugu";
import BirthChart from "../BirthChart";

// Planet name translations
const planetTranslations = {
  "Sun": telugu.sun,
  "Moon": telugu.moon,
  "Mercury": telugu.mercury,
  "Venus": telugu.venus,
  "Mars": telugu.mars,
  "Jupiter": telugu.jupiter,
  "Saturn": telugu.saturn,
  "Rahu": telugu.rahu,
  "Ketu": telugu.ketu,
};

const getPlanetName = (englishName) => {
  return planetTranslations[englishName] || englishName;
};

const PlanetsSection = ({ data }) => {
  if (!data || !data.analysis) {
    return <div className="empty-state">🪐 {telugu.noDataAvailable}</div>;
  }

  const analysis = data.analysis;
  const chart = data.chart;

  return (
    <div className="section-container">
      <div className="card astro-card">
        <h2 className="astro-section-title">🪐 {telugu.planetaryPositions}</h2>
        
        {/* Birth Chart */}
        <div style={{ marginBottom: "32px" }}>
          <BirthChart chart={chart} analysis={analysis} />
        </div>

        {/* Planets List */}
        {analysis?.planets && Array.isArray(analysis.planets) && (
          <div className="planets-list">
            {analysis.planets.map((planet, idx) => (
              <div key={idx} className="planet-card">
                <h3>{getPlanetName(planet.planet)}</h3>
                <div className="planet-info">
                  <p><strong>{telugu.zodiacSign}:</strong> {planet.sign}</p>
                  <p><strong>{telugu.house}:</strong> {planet.house}</p>
                  <p><strong>{telugu.nakshatra}:</strong> {planet.nakshatra}</p>
                  <p><strong>{telugu.degree}:</strong> {planet.degree}°</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetsSection;
