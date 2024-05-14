// LoginPage.tsx

import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../css/login.css"; 


const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const apiUrl = 'http://127.0.0.1:8000/login/'
            const response = await axios.post(
                apiUrl,
                {
                    username: formData.username,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Login successful:', response.data);
            const responseData = response.data;
            localStorage.setItem('token', responseData.access_token);
            localStorage.setItem('isLoggedIn', 'true');
            navigate("/products")
        } catch (error) {
            console.error('Login failed:', error);
            // Handle error
        }
    };

    return (
        <Container className="login-container my-5">
            <h2 className="login-title">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="login-btn">
                    Login
                </Button>
            </Form>
            <p className="login-link mt-3">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </Container>
    );
};

export default LoginPage;
