import axios from 'axios';
import { AUTH_TOKEN_KEY } from '../../context/AuthContext/types';

console.log(import.meta.env.VITE_API_URL);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
});

const token = localStorage.getItem(AUTH_TOKEN_KEY);
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
