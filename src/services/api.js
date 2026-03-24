import axios from "axios";

const API_URL = "http://localhost:5000/api/astrology";

export const analyzeAstrology = (data, askQuestion = false, language = "english") => {
  const payload = {
    ...data,
    language: language
  };
  
  if (askQuestion) {
    return axios.post(`${API_URL}/ask`, payload);
  } else {
    return axios.post(`${API_URL}/analyze`, payload);
  }
};

export const checkApiHealth = () => {
  return axios.get(`${API_URL}/health`);
};