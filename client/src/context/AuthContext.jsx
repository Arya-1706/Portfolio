
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import api from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem('token')
  );

  const login = async (email, password) => {
    const res = await api.post('/auth/login', {
      email,
      password
    });

    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  useEffect(() => {
    const id = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (
          err.response?.status === 401 &&
          localStorage.getItem('token')
        ) {
          logout();
        }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(id);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthed: Boolean(token),
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
