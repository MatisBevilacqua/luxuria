import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Verify from '../../Api/Security/Verify';

function VerifyToken() {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                navigate('/login');
            } else {
                Verify(storedToken);
            }
        } catch (err) {
            navigate('/login');
        }
    }, [navigate]);
}

export default VerifyToken;
