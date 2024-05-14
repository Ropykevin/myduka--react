import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/logout.css"

const LogoutButton: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <Button variant="danger" className="logout-button" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;