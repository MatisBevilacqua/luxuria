import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import verify from '../Api/Security/Verfiy'; 

const ProtectedRoutes = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem('token'); 
        if (token) {
          await verify(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;  
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />} 
    />
  );
};

export default ProtectedRoutes;

