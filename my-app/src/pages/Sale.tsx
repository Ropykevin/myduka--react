import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SaleForm from '../components/SaleForm';

interface Sale {
    id: number;
    quantity: number;
    total_price: number;
    sold_at: string;
    product_id: number;
}

const Sales: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Access token not found');
                }

                const response = await axios.get<Sale[]>('http://127.0.0.1:8000/sales', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSales(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };

        fetchSales();
    }, []);

    return (
        <div>
            <h2>Sales</h2>
            <div>
                <h1>Main Page</h1>
                <SaleForm />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Sold At</th>
                        <th>Product ID</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.total_price}</td>
                            <td>{sale.sold_at}</td>
                            <td>{sale.product_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sales;
