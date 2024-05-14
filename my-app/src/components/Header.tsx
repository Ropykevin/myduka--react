import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../css/header.css"

export default function Header() {
    return (
        <Navbar className="header" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">MyDuka</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/sales">Sales</Nav.Link>


            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
        </Navbar>
    );
};

