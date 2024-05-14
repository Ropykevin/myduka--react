import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

interface SalesPerDay {
    x: string;
    y: number;
}

interface SalesPerProduct {
    x: string;
    y: number;
}

interface ProfitPerDay {
    x: string;
    y: number;
}

interface ProfitPerProduct {
    x: string;
    y: number;
}

function Domain() {
    const [salesPerDay, setSalesPerDay] = useState<SalesPerDay[]>([]);
    const [profitPerDay, setProfitPerDay] = useState<ProfitPerDay[]>([]);
    const [salesPerProduct, setSalesPerProduct] = useState<SalesPerProduct[]>([]);
    const [profitPerProduct, setProfitPerProduct] = useState<ProfitPerProduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Access token not found");
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const [
                    salesPerDayResponse,
                    profitPerDayResponse,
                    salesPerProductResponse,
                    profitPerProductResponse,
                ] = await Promise.all([
                    axios.get("/sales_per_day", { headers }),
                    axios.get("/profit_per_day", { headers }),
                    axios.get("/sales_per_product", { headers }),
                    axios.get("/profit_per_product", { headers }),
                ]);

                setSalesPerDay(salesPerDayResponse.data.data);
                setProfitPerDay(profitPerDayResponse.data.data);
                setSalesPerProduct(salesPerProductResponse.data.data);
                setProfitPerProduct(profitPerProductResponse.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="main-container">
            <div className="main-title">
                <h3>DASHBOARD</h3>
            </div>

            <div className="charts">
                <div className="chart">
                    <h2>Sales per Day</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesPerDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="y" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h2>Profit per Day</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={profitPerDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h2>Sales per Product</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesPerProduct}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="y" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <h2>Profit per Product</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={profitPerProduct}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="y" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </main>
    );
}

export default Domain;
