import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const ProtectedRoute = ({ path, element }: { path: string; element: React.ReactNode }) => {
    return isAuthenticated() ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
