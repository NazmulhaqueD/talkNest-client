import axios from 'axios';
import { AuthContext } from '../context/provider/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const UseAxiosSecure = () => {
    
    return axiosSecure;
};

export default UseAxiosSecure;