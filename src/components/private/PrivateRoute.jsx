import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/provider/AuthProvider';
import Loader from '../shared/Loader';

const PrivateRoute = ({ children }) => {

    const { loading, user } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>
    }
    if (user && user.email) {
        return children;
    }
    else {
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }
};

export default PrivateRoute;