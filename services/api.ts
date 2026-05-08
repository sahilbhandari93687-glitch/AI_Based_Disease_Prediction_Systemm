import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const diseaseApi = {
  getSymptoms: () => api.get('/symptoms'),
  predict: (symptoms: string[], model: string) => api.post('/predict', { symptoms, model }),
  getHistory: () => api.get('/history'),
};

export default api;
