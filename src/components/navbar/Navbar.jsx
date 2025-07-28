import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/provider/AuthProvider';
import { NavLink } from 'react-router';
import Logout from '../logout/Logout';

const Navbar = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    const { user} = useContext(AuthContext);

    const links = <>
        <NavLink className='text-base-100 hover:text-primary' to='/'>home</NavLink>
        <NavLink className='text-base-100 hover:text-primary' to='/membership'>Membership</NavLink>
        <NavLink className='text-base-100 hover:text-primary' to='/notifications'>Notification </NavLink>

    </>

    return (
        <nav className='bg-secondary text-accent shadow-sm'>
            <div className="navbar max-w-7xl mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 mobileLinks shadow activeLink">
                            {links}
                        </ul>
                    </div>
                    <a href="/"><h2 className="text-2xl font-bold text-primary">TalkNest</h2></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-x-4 font-semibold activeLink">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end items-center gap-2">
                    <div>
                        {
                            user ?
                                <span className='relative'>
                                    <div className="tooltip tooltip-bottom w-full flex flex-col items-center" data-tip={`${user?.displayName}`}>
                                        <img referrerPolicy='no-referrer' onClick={() => setIsDropdown(!isDropdown)} src={user?.photoURL} className='w-12 h-12 rounded-full cursor-pointer' alt="" />
                                    </div>
                                    <div className={`dropdownBox w-46 flex flex-col z-20 bg-base-300 p-4 mt-0 rounded-b-sm gap-y-2 transition-all duration-300 absolute activeLink linkByImage right-0 
                                    ${isDropdown ? 'top-14' : '-top-56'}`}>
                                        <p>{user?.displayName}</p>
                                        <p><NavLink onClick={() => setIsDropdown(false)} to={'/profile'}>Dashboard</NavLink></p>
                                        <p><NavLink onClick={() => setIsDropdown(false)}><Logout></Logout></NavLink></p>
                                    </div>
                                </span> :
                                <NavLink to={'/login'} className='btn btn-sm btn-primary text-sm'>Join Us</NavLink>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;