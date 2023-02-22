import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
    const auth = useSelector((store) => store.auth);
    const location = useLocation();
    return auth.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
}