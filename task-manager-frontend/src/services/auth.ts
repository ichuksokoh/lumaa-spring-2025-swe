import API from './api';

export const registerUser = async (username: string, password: string) => {
  return API.post('/auth/register', { username, password });
};

export const loginUser = async (username: string, password: string) => {
  const response = await API.post('/auth/login', { username, password });
  if (response.data.token) localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}