// api.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', 

});

const api = {
  getItems: () => instance.get('/blogs'),
  registerUser: (userData) => instance.post('/register', userData),
  loginUser: (userData) => instance.post('/login', userData),
  verifyUser: (userData, config) => instance.post('/verify-otp', userData, config),

};

export default api;
