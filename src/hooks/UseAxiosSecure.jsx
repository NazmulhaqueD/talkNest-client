import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/provider/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const UseAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        // Cleanup interceptor on unmount
        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
        };
    }, [user?.accessToken]);

    return axiosSecure;
};

export default UseAxiosSecure;