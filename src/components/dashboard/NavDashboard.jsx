import { NavLink } from 'react-router';
import { FaHome } from "react-icons/fa";
import { IoMenu } from 'react-icons/io5';
import { useContext } from 'react';
import { AuthContext } from '../../context/provider/AuthProvider';

const NavDashboard = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='px-4 py-6 shadow-lg flex justify-between items-center mb-6 sticky top-0 z-50 bg-base-200'>
            <h1 className='text-xl lg:text-3xl font-semibold'><span className='text-accent'>Welcome Back! </span><br className=' lg:hidden ' />
                {user?.displayName.split(' ').slice(0, 2).join(' ')}
            </h1>
            <div className='flex justify-center items-center gap-4'>
                <NavLink to={'/'}><FaHome size={36} /></NavLink>
                <div>
                    <img className='w-12 h-12 rounded-full' src={user?.photoURL} alt="" />
                </div>
                <label htmlFor="my-drawer" className="drawer-button lg:hidden">
                    <IoMenu size={36} />
                </label>

            </div>
        </div>
    );
};

export default NavDashboard;