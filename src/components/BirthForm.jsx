import React, { useState } from "react";
import { analyzeAstrology } from "../services/api";
import { telugu } from "../translations/telugu";

const BirthForm = ({ setResult, setLoading, setError, language }) => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    place: "",
    userAge: ""
  });
  const [question, setQuestion] = useState("");
  const [useQuestion, setUseQuestion] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!form.date || !form.time || !form.place) {
        setError(telugu.fillFields);
        setLoading(false);
        return;
      }

      let res;
      if (useQuestion && question.trim()) {
        res = await analyzeAstrology({
          ...form,
          question,
          userAge: form.userAge ? parseInt(form.userAge) : undefined
        }, true, language);
      } else {
        res = await analyzeAstrology({
          ...form,
          userAge: form.userAge ? parseInt(form.userAge) : undefined
        }, false, language);
      }
      
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || telugu.unexpectedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="birth-form-container astro-card">
      <form onSubmit={handleSubmit} className="birth-form">
        <div className="form-group">
          <label className="astro-section-title">{telugu.birthDate}</label>
          <input 
            type="date" 
            className="astro-input"
            value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})} 
            required
          />
        </div>

        <div className="form-group">
          <label className="astro-section-title">{telugu.birthTime}</label>
          <input 
            type="time" 
            className="astro-input"
            value={form.time}
            onChange={(e) => setForm({...form, time: e.target.value})} 
            required
          />
        </div>

        <div className="form-group">
          <label className="astro-section-title">{telugu.birthPlace}</label>
          <input 
            type="text" 
            className="astro-input"
            placeholder="నగరం, దేశం" 
            value={form.place}
            onChange={(e) => setForm({...form, place: e.target.value})} 
            required
          />
        </div>

        <div className="form-group">
          <label className="astro-section-title">{telugu.age}</label>
          <input 
            type="number" 
            className="astro-input"
            placeholder={telugu.currentAge}
            value={form.userAge}
            onChange={(e) => setForm({...form, userAge: e.target.value})}
            min="0"
            max="120"
          />
        </div>

        <div className="form-group checkbox">
          <label className="astro-section-title">
            <input 
              type="checkbox" 
              checked={useQuestion}
              onChange={(e) => setUseQuestion(e.target.checked)}
            />
            {telugu.askQuestion}
          </label>
        </div>

        {useQuestion && (
          <div className="form-group">
            <label className="astro-section-title">{telugu.yourQuestion}</label>
            <input 
              type="text" 
              className="astro-input"
              placeholder={telugu.questionPlaceholder}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        )}

        <button type="submit" className="astro-btn">{telugu.analyzeBtn}</button>
      </form>
    </div>
  );
};

export default BirthForm;