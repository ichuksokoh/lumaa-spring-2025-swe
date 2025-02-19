import { useState, ReactNode } from 'react';
import { AuthContext } from './authContext';
import { loginUser } from '../services/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('username'));

  const login = async (username: string, password: string) => {
    await loginUser(username, password);
    setUser(username);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
