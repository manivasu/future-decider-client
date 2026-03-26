import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://future-decider-server.onrender.com";

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
