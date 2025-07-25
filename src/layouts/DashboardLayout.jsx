import React from 'react';
import AsideDash from '../components/dashboard/AsideDashboard';
import NavDashboard from '../components/dashboard/NavDashboard';
import { Outlet, useLoaderData } from 'react-router';

const DashboardLayout = () => {

    const dbUser = useLoaderData();
    console.log(dbUser);


    return (
        <div className="drawer lg:gap-6 lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <NavDashboard></NavDashboard>
                <div className='bg-base-300 rounded-sm min-h-[88vh] z-10'>
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