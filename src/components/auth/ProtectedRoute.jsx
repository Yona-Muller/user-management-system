import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from '../../hooks/useRouter';

export const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
};