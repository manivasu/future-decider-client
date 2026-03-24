import React from "react";
import { telugu } from "../translations/telugu";
import BirthChart from "./BirthChart";

const Predictions = ({ data }) => {


  if (!data || !data.analysis) return null;

  const analysis = data.analysis;
  const chart = data.chart;

  return (
    <div className="predictions-container astro-card">
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



      <div className="dashboard-grid">
        {/* CHART SECTION */}
        <div className="section">
          <h2>💫 చార్టు</h2>
          <BirthChart chart={chart} analysis={analysis} />
        </div>

        {/* PLANET INFORMATION SECTION */}
        <div className="section planet-info-section">
            <h2>🌍 గ్రహాల సంచారం - గ్రహాలు ఎక్కడ ఉన్నాయి?</h2>
            
            <div className="planet-intro">
              <p>
                <strong>ఆకాశంలో 9 గ్రహాలు ఉన్నాయి:</strong> సూర్యుడు, చంద్రుడు, బుధుడు, శుక్రుడు, మంగళుడు, గురువు, శని, రాహువు, కేటువు. 
                ఈ గ్రహాలు నిరంతరం కదులుతూ ఉంటాయి. ఒక గ్రహం కొన్ని రోజుల్లో ఒక రాశిని (రాశిచక్రం) వదిలివేసి మరొక రాశిలోకి ప్రవేశిస్తుంది.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>🔴 సూర్యుడు (Sun) ☉</h3>
              <p>
                <strong>అర్థం:</strong> శక్తి, ప్రతిష్ఠ, ఆనందం, నేతృత్వం<br/>
                <strong>సంచారం:</strong> సూర్యుడు ఒక రాశిలో సుమారు 30 రోజుల రోజుల ఉంటాడు. తర్వాత మరొక రాశిలోకి చేరుకుంటాడు.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> సూర్యుడు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Sun")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>🌙 చంద్రుడు (Moon) ☽</h3>
              <p>
                <strong>అర్థం:</strong> మనస్సు, భావాలు, ఆరోగ్యం, కుటుంబం<br/>
                <strong>సంచారం:</strong> చంద్రుడు అత్యంత వేగంగా కదులుతాడు. ఒక రాశిలో కేవలం 2-3 రోజులు ఉంటాడు. ప్రతి నెలకు 12 రాశులను భ్రమణం చేస్తాడు.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> చంద్రుడు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Moon")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>☿ బుధుడు (Mercury) ☿</h3>
              <p>
                <strong>అర్థం:</strong> మేధస్సు, కమ్యూనికేషన్, వ్యాపారం<br/>
                <strong>సంచారం:</strong> బుధుడు సుమారు 3 వారాలు ఒక రాశిలో ఉంటాడు. రెట్ర్ోగ్రేడ్ కాలంలో కలికలిసిన ఫలితాలు ఇస్తాడు.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> బుధుడు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Mercury")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>♀ శుక్రుడు (Venus) ♀</h3>
              <p>
                <strong>అర్థం:</strong> ప్రేమ, సౌందర్యం, సంపద, సుఖం<br/>
                <strong>సంచారం:</strong> శుక్రుడు సుమారు 23-25 రోజులు ఒక రాశిలో ఉంటాడు. ఇది ప్రేమ, వివాహం, ఆర్థిక వృద్ధికి ఉపయోగకరమైన సమయం.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> శుక్రుడు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Venus")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>♂ మంగళుడు (Mars) ♂</h3>
              <p>
                <strong>అర్థం:</strong> సాహసం, శక్తి, పట్టభద్రత, విక్రమం<br/>
                <strong>సంచారం:</strong> మంగళుడు సుమారు 40-45 రోజులు ఒక రాశిలో ఉంటాడు. యుద్ధం, శత్రువులను కెదర్చడానికి ఉపయోగించుకుంటారు.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> మంగళుడు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Mars")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>♃ గురువు (Jupiter) ♃</h3>
              <p>
                <strong>అర్థం:</strong> జ్ఞానం, ధర్మం, సంపద, అదృష్టం<br/>
                <strong>సంచారం:</strong> గురువు సుమారు 13 నెలలు (సుమారు 1 సంవత్సరం) ఒక రాశిలో ఉంటాడు. ఇది వృద్ధి, సుఖం కోసం మంచి సమయం.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> గురువు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Jupiter")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>♄ శని (Saturn) ♄</h3>
              <p>
                <strong>అర్థం:</strong> శ్రమ, జోక, ఇందిరయ, కర్మ<br/>
                <strong>సంచారం:</strong> శని సుమారు 2.5 సంవత్సరాలు ఒక రాశిలో ఉంటాడు. ఇది కష్టమైన సమయం కానీ ఆత్మపరిపూర్ణతకు దారితీసేది.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> శని ఈ రోజు {analysis?.planets?.find(p => p.planet === "Saturn")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>Ⴀ రాహువు (Rahu) Ⴀ</h3>
              <p>
                <strong>అర్థం:</strong> గుప్తతత్వం, ఆశీర్వాదం, అవర్ణీయమైనవి<br/>
                <strong>సంచారం:</strong> రాహువు సుమారు 18 నెలలు ఒక రాశిలో ఉంటాడు. ఇది మార్పు, కొత్త అవకాశాల సమయం.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> రాహువు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Rahu")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-explanation">
              <h3>Ⴁ కేటువు (Ketu) Ⴁ</h3>
              <p>
                <strong>అర్థం:</strong> ముక్తి, ఆధ్యాత్మికత, విచ్ఛిన్నత<br/>
                <strong>సంచారం:</strong> కేటువు సుమారు 18 నెలలు ఒక రాశిలో ఉంటాడు. ఇది విటాబిలిటీ, యోగ సాధన కోసం మంచి సమయం.<br/>
                <strong>నన్ను ఇప్పుడు చూడండి:</strong> కేటువు ఈ రోజు {analysis?.planets?.find(p => p.planet === "Ketu")?.sign || "రాశిలో"} ఉన్నాడు.
              </p>
            </div>

            <div className="planet-note">
              <h3>💡 ముఖ్యమైన కారణాలు:</h3>
              <ul>
                <li><strong>ప్రతి గ్రహం సంచారం విభిన్నం:</strong> కొన్ని గ్రహాలు వేగంగా కదులుతాయి (చంద్రుడు, సూర్యుడు, బుధుడు), కొన్ని నెమ్మదిగా (శని, రాహువు).</li>
                <li><strong>గ్రహ సంచారం జీవితమీద ప్రభావం:</strong> గ్రహం రాశి మారినప్పుడు, దానిపై జీవితంలో చేసిన కర్మలపై ఆధారపడి ఫలితాలు మారుతాయి.</li>
                <li><strong>ప్రతిరోజు సంచారం వేర్వేరు:</strong> ఈ రోజు గ్రహాలు ఎక్కడ ఉన్నాయో చార్టులో చూడండి.</li>
              </ul>
            </div>
          </div>
        

        {/* SUMMARY SECTION */}
        {analysis.summary && (
          <div className="section">
            <h2>{telugu.overallTone}</h2>
            <p className="tone-text">{analysis.summary.overallTone}</p>

            {analysis.summary.strengths?.length > 0 && (
              <div className="strengths">
                <h3>{telugu.strengths}</h3>
                <ul>
                  {analysis.summary.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.summary.challenges?.length > 0 && (
              <div className="challenges">
                <h3>{telugu.challenges}</h3>
                <ul>
                  {analysis.summary.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.summary.opportunities?.length > 0 && (
              <div className="opportunities">
                <h3>{telugu.opportunities}</h3>
                <ul>
                  {analysis.summary.opportunities.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.summary.nextActions?.length > 0 && (
              <div className="next-actions">
                <h3>{telugu.nextSteps}</h3>
                <ol>
                  {analysis.summary.nextActions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* SCORECARD SECTION */}
        {analysis.scorecard && (
          <div className="section">
            <h2>{telugu.lifeAreasScorecard}</h2>
            <div className="scorecard">
              {Object.entries(analysis.scorecard).map(([area, score]) => {
                const areaLabels = {
                  career: telugu.career,
                  relationships: telugu.relationships,
                  finances: telugu.finances,
                  health: telugu.health,
                  spirituality: telugu.spirituality,
                  creativity: telugu.creativity,
                  family: telugu.family,
                  overall: telugu.overall
                };
                return (
                  <div key={area} className="score-item">
                    <div className="score-label">{areaLabels[area] || area.toUpperCase()}</div>
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{
                          width: `${(score / 10) * 100}%`,
                          backgroundColor: score >= 7 ? "#4caf50" : score >= 5 ? "#ff9800" : "#f44336"
                        }}
                      />
                    </div>
                    <div className="score-value">{score}/10</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PLANETS SECTION */}
        {analysis.planets?.length > 0 && (
          <div className="section">
            <h2>{telugu.planetaryPositions}</h2>
            <div className="items-grid">
              {analysis.planets.map((planet, i) => (
                <div key={i} className="item-card planet-card">
                  <div className="planet-header">
                    <h4>{planet.planet}</h4>
                  </div>
                  
                  <div className="planet-details">
                    {planet.sign && (
                      <div className="detail-row">
                        <span className="label">{telugu.zodiacSign}</span>
                        <span className="zodiac-sign">{planet.sign}</span>
                      </div>
                    )}
                    
                    {planet.degree !== undefined && (
                      <div className="detail-row">
                        <span className="label">{telugu.degree}</span>
                        <span className="value">{planet.degree.toFixed(1)}°</span>
                      </div>
                    )}
                    
                    {planet.house && (
                      <div className="detail-row">
                        <span className="label">{telugu.house}</span>
                        <span className="value">{telugu.house} {planet.house}</span>
                      </div>
                    )}
                    
                    {planet.nakshatra && (
                      <div className="detail-row">
                        <span className="label">{telugu.nakshatra}</span>
                        <span className="value">{planet.nakshatra}</span>
                      </div>
                    )}
                    
                    {planet.placement && (
                      <div className="detail-row">
                        <span className="label">{telugu.placement}</span>
                        <span className="value">{planet.placement}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="planet-strength">
                    <p className={`strength ${planet.strength?.toLowerCase()}`}>
                      <strong>{telugu.strength}</strong> {planet.strength}
                    </p>
                  </div>
                  
                  {planet.type && <p className="planet-type"><strong>{telugu.type}</strong> {planet.type}</p>}
                  <p className="message">{planet.message}</p>
                  {planet.source && <p className="source">{telugu.source} {planet.source}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YOGAS SECTION */}
        {analysis.yogas?.length > 0 && (
          <div className="section">
            <h2>{telugu.yogasTitle}</h2>
            <div className="items-grid">
              {analysis.yogas.map((yoga, i) => (
                <div key={i} className={`item-card yoga-card ${yoga.type}`}>
                  <div className="yoga-header">
                    <h4>{yoga.yoga}</h4>
                    <span className={`badge ${yoga.type}`}>{yoga.type.toUpperCase()}</span>
                  </div>
                  <p className="message">{yoga.message}</p>
                  {yoga.source && <p className="source">{telugu.source} {yoga.source}</p>}
                  <p className="confidence">{telugu.confidence}: {Math.round(yoga.confidence * 100)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROBLEMS SECTION */}
        {analysis.problems?.length > 0 && (
          <div className="section">
            <h2>{telugu.realLifeChallenges}</h2>
            <div className="problems-list">
              {analysis.problems.map((problem, i) => (
                <div key={i} className={`problem-card severity-${problem.severity}`}>
                  <div className="problem-header">
                    <h3>{problem.problem}</h3>
                    <span className={`severity-badge severity-${problem.severity}`}>
                      {problem.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p><strong>{telugu.area}</strong> {problem.area}</p>
                  <p><strong>{telugu.detection}</strong> {problem.detection}</p>
                  <p><strong>{telugu.reason}</strong> {problem.reason}</p>
                  
                  {problem.timeline && (
                    <p><strong>{telugu.timeline}</strong> {problem.timeline}</p>
                  )}
                  
                  {problem.solutions?.length > 0 && (
                    <div className="solutions">
                      <h4>{telugu.solutions}</h4>
                      <ul>
                        {problem.solutions.map((solution, j) => (
                          <li key={j}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <p className="confidence">{telugu.confidence}: {Math.round(problem.confidence * 100)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DASHA SECTION */}
        {analysis.dasha && (
          <div className="section">
            <h2>{telugu.dashaSystem}</h2>
            
            {analysis.dashaInterpretation && (
              <div className="current-dasha">
                <h3>{telugu.currentDashaPeriod}</h3>
                <p><strong>{telugu.lord}</strong> {analysis.dashaInterpretation.currentDasha}</p>
                <p><strong>{telugu.timeline}</strong> {analysis.dashaInterpretation.timeline}</p>
                <p><strong>{telugu.theme}</strong> {analysis.dashaInterpretation.theme}</p>
                
                {analysis.dashaInterpretation.expectations?.length > 0 && (
                  <div>
                    <h4>What to expect:</h4>
                    <ul>
                      {analysis.dashaInterpretation.expectations.map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {analysis.dasha?.dashaProgression && (
              <div className="dasha-timeline">
                <h3>Upcoming Dasha Periods</h3>
                <div className="timeline">
                  {analysis.dasha.dashaProgression.slice(0, 5).map((dasha, i) => (
                    <div key={i} className="dasha-period">
                      <h4>{dasha.lord} Dasha</h4>
                      <p><strong>Period:</strong> {dasha.period} years</p>
                      <p><strong>Age:</strong> {dasha.startAge} - {dasha.endAge}</p>
                      {dasha.predictions && (
                        <div>
                          <p><strong>Theme:</strong> {dasha.predictions.theme}</p>
                          <ul>
                            {dasha.predictions.predictions?.slice(0, 3).map((pred, j) => (
                              <li key={j}>{pred}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      {analysis.recommendations?.length > 0 && (
        <div className="recommendations-section">
          <h2>📌 Key Recommendations</h2>
          <div className="recommendations-list">
            {analysis.recommendations.slice(0, 5).map((rec, i) => (
              <div key={i} className="recommendation-item">
                <span className={`priority ${rec.priority}`}>{rec.priority}</span>
                <div>
                  <h4>{rec.issue || rec.opportunity}</h4>
                  {rec.actions && (
                    <ul>
                      {rec.actions.map((action, j) => (
                        <li key={j}>{action}</li>
                      ))}
                    </ul>
                  )}
                  {rec.action && <p>{rec.action}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictions;