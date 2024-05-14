// RegisterPage.tsx

import React, { useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../css/register.css';

const RegisterPage: React.FC = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
            const response = await axios.post('http://127.0.0.1:8000/register', formData);
            console.log('Registration successful:', response.data);
            navigate("/login")
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Container className="register-container py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="register-title">Register Page</h2>
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

                        <Form.Group controlId="email">
                            <Form.Label className="form-label">Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email"
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

                        <Button variant="primary" type="submit" className="register-btn">
                            Register
                        </Button>
                    </Form>
                    <p className="register-link mt-3">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
