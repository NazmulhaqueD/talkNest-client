import React, { useContext, useEffect, useState } from 'react';
import AsideDash from '../components/dashboard/AsideDashboard';
import NavDashboard from '../components/dashboard/NavDashboard';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { AuthContext } from '../context/provider/AuthProvider';
import { Outlet } from 'react-router';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [dbUser, setDbUser] = useState(null)

    console.log(dbUser);
    useEffect(() => {
        const dbUser = axiosSecure.get(`/user?email=${user?.email}`)
            .then(res => {
                setDbUser(res?.data);
            })
            .catch(error => {
                console.log(error);
            })
        console.log(dbUser);
    }, [axiosSecure, user])

    return (
        <div className="drawer lg:gap-6 lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <NavDashboard></NavDashboard>
                <div className='bg-base-300 p-4 rounded-sm min-h-[88vh] z-10'>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-secondary text-accent min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <AsideDash dbUser={dbUser}></AsideDash>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;