import React, { useContext } from 'react';
import { AuthContext } from '../../context/provider/AuthProvider';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router';

const Logout = () => {

      const {logOut } = useContext(AuthContext);
    
        const handleLogout = () => {
            logOut()
                .then(() => {
                    toast('logout successfully');
                })
                .catch(error => {
                    toast.error(error.message)
                })
        }

    return (
        <button onClick={handleLogout} className=''>LogOut</button>
    );
};

export default Logout;