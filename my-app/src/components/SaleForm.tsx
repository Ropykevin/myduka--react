import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
}

interface SaleCreate {
    pid: number;
    quantity: number;
}

const SaleForm: React.FC = () => {
    const [formData, setFormData] = useState<SaleCreate>({
        pid: 0,
        quantity: 0,
    });
    const [products, setProducts] = useState<Product[] | undefined>(undefined);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Access token not found');
                }

                const response = await axios.get<{ products: Product[] }>('http://127.0.0.1:8000/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Fetched products:", response.data); 

                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("my prods", products);
    }, [products]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'pid' ? parseInt(value, 10) : parseInt(value, 10),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Access token not found');
            }

            await axios.post('http://127.0.0.1:8000/sales', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Sale created successfully');
        } catch (error) {
            console.error('Error creating sale:', error);
            alert('Failed to create sale');
        }
    };

    return (
        <div>
            <h2>Create Sale</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Product:
                        <select name="pid" value={formData.pid} onChange={handleChange}>
                            <option value={0}>Select Product</option>
                            {products && products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Create Sale</button>
            </form>
        </div>
    );
};

export default SaleForm;
