'use client'
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem('token');
      let isValid = false;
      if (storedToken) {
        try {
          const res = await fetch('http://adbry.test/v1/auth/verificar-token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });
          const text = await res.text();
          let backendStatus = res.status;
          let backendBody = {};
          try {
            backendBody = JSON.parse(text);
          } catch {}
          if (backendStatus === 200 && backendBody.status === 401) {
            setToken(null);
            localStorage.removeItem('token');
            isValid = false;
          } else if (backendStatus === 200) {
            setToken(storedToken);
            isValid = true;
          } else {
            setToken(null);
            localStorage.removeItem('token');
            isValid = false;
          }
        } catch (err) {
          setToken(null);
          localStorage.removeItem('token');
          isValid = false;
        }
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (!loading && !token) {
      router.replace('/authentication/login');
    }
  }, [loading, token, router]);

  const login = async (username, password) => {
    try {
      const res = await fetch('http://adbry.test/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.messages };
      }
    } catch (error) {
      return { success: false, message: 'Error de red' };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    router.replace('/authentication/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
