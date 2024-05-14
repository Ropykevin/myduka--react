import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "../css/home.css";

const HomePage: React.FC = () => {
    return (
        <Container className="home-container">
            <h1 className="home-title">Welcome to MyApp</h1>
            <p className="home-description">
                This is a simple application to demonstrate user authentication and authorization
                using React, TypeScript, and FastAPI with JWT.
            </p>
            <div className="home-options">
                <Link to="/register">
                    <Button className='register' variant="primary">Register</Button>
                </Link>
                <Link to="/login">
                    <Button className='login' variant="secondary">Login</Button>
                </Link>
            </div>
        </Container>
    );
};

export default HomePage;
