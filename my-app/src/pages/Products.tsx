import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

import "../css/products.css"
interface Product {
    id: number;
    name: string;
    cost: number;
    price: number;
    stock_quantity: number;
}

const Products: React.FC = () => {
    const token = localStorage.getItem("token");

    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        price: '',
        stock_quantity: ''
    });

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>('http://127.0.0.1:8000/products/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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
            if (!token) {
                console.error('No token found');
                return; 
            }
            const response = await axios.post(
                'http://127.0.0.1:8000/products/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Product added:', response.data);
            setFormData({
                name: '',
                cost: '',
                price: '',
                stock_quantity: ''
            });
            if (token) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Container className="products-container py-4">
            <h2 className="mb-4">Manage Products</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="product-grid">
                    <Col sm={4}>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            type="number"
                            name="cost"
                            placeholder="Cost"
                            value={formData.cost}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </Col>
                    <Col sm={2}>
                        <Form.Control
                            type="number"
                            name="stock_quantity"
                            placeholder="Stock Quantity"
                            value={formData.stock_quantity}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </Col>
                    <Col sm={2}>
                        <Button variant="primary" type="submit" className="add-product-btn">
                            Add Product
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {products.map((product) => (
                    <Col  key={product.id}>
                        <Card className="product-card">
                            <Card.Body>
                                <Card.Title className="product-card-title">{product.name}</Card.Title>
                                <Card.Text className="product-card-text">Cost: ${product.cost.toFixed(2)}</Card.Text>
                                <Card.Text className="product-card-text">Price: ${product.price.toFixed(2)}</Card.Text>
                                <Card.Text className="product-card-text">Stock Quantity: {product.stock_quantity}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;
