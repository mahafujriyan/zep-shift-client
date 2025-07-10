import React, { useContext } from 'react';
import { AuthContext } from '../Pages/Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user) {
        <Navigate to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;