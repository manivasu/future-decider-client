import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BirthForm from "./components/BirthForm";
import BirthChart from "./components/BirthChart";
import Sidebar from "./components/Sidebar";
import SummarySection from "./components/predictions/SummarySection";
import ScorecardSection from "./components/predictions/ScorecardSection";
import PlanetsSection from "./components/predictions/PlanetsSection";
import YogasSection from "./components/predictions/YogasSection";
import ProblemsSection from "./components/predictions/ProblemsSection";
import DashaSection from "./components/predictions/DashaSection";
import { telugu } from "./translations/telugu";
import "./styles/PredictionSections.css";

const MainLayout = ({ children, result }) => (
  <div className="main-layout">
    <Sidebar />
    <main className="main-content">
      <header className="app-header">
        <div className="header-top">
          <h1>{telugu.title}</h1>
        </div>
        <p>{telugu.subtitle}</p>
      </header>
      <div className="app-content">{children}</div>
    </main>
  </div>
);

const BirthFormView = ({ setResult, setLoading, setError, language }) => {
  const navigate = useNavigate();
  return (
    <BirthForm
      setResult={(res) => {
        setResult(res);
        navigate("/predictions/summary");
      }}
      setLoading={setLoading}
      setError={setError}
      language={language}
    />
  );
};

const ChartView = ({ result, language }) => {
  if (!result || !result.chart) {
    return (
      <div className="empty-state">
        <p>📊 {telugu.noData}</p>
      </div>
    );
  }
  return <BirthChart chart={result.chart} analysis={result.analysis} />;
};

const AppRoutes = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language] = useState("telugu");

  return (
    <MainLayout result={result}>
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">{telugu.analyzing}</div>}
      <Routes>
        <Route
          path="/"
          element={
            <BirthFormView
              setResult={setResult}
              setLoading={setLoading}
              setError={setError}
              language={language}
            />
          }
        />
        
        {/* Prediction Sections */}
        <Route
          path="/predictions/summary"
          element={<SummarySection data={result} language={language} />}
        />
        <Route
          path="/predictions/scorecard"
          element={<ScorecardSection data={result} language={language} />}
        />
        <Route
          path="/predictions/planets"
          element={<PlanetsSection data={result} language={language} />}
        />
        <Route
          path="/predictions/yogas"
          element={<YogasSection data={result} language={language} />}
        />
        <Route
          path="/predictions/problems"
          element={<ProblemsSection data={result} language={language} />}
        />
        <Route
          path="/predictions/dasha"
          element={<DashaSection data={result} language={language} />}
        />
        
        <Route
          path="/chart"
          element={<ChartView result={result} language={language} />}
        />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
