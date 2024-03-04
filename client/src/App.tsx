import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Verify from './Api/Security/Verify';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDashboardRoute) {
      VerifyToken();
    }
  }, [isDashboardRoute]);

  const VerifyToken = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        navigate('/login');
      } else {
        const isValidToken = await Verify(storedToken);
        if (!isValidToken) {
          navigate('/login');
        } else {
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <>
      {isAuthenticated || !isDashboardRoute ? <Outlet /> : null}
    </>
  )
}

export default App;
