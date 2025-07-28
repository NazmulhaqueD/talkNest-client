import React, { useContext } from 'react';
import AsideDash from '../components/dashboard/AsideDashboard';
import NavDashboard from '../components/dashboard/NavDashboard';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { AuthContext } from '../context/provider/AuthProvider';
import { Outlet } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/shared/Loader';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: dbUser, isLoading } = useQuery({
        queryKey: ['dbUser', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosSecure.get(`/user?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Only run if email exists
    });
    if(isLoading) return <Loader></Loader>;

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