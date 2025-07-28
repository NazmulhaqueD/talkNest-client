import { ImProfile } from 'react-icons/im';
import { NavLink } from 'react-router';
import Logout from '../logout/Logout';

const AsideDash = ({ dbUser }) => {

    const userRout = <>
        <NavLink to={'/myProfile'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>My Profile</span></NavLink>
        <NavLink to={'/addPost'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>Add Post</span></NavLink>
        <NavLink to={'/myPosts'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>My Posts</span></NavLink>
    </>
    const adminRout = <>
        <NavLink to={'/adminProfile'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>Admin Profile</span></NavLink>
        <NavLink to={'/manageUsers'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>Manage Users</span></NavLink>
        <NavLink to={'/reportedComments'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>Reported Comments</span></NavLink>
        <NavLink to={'/reportedComments'} className={'flex items-center gap-2 font-semibold'}><ImProfile /> <span>Make Announcement
        </span></NavLink>
    </>

    return (
        <div className=''>
            <h1 className='text-4xl pt-2 font-bold text-primary mb-16'><NavLink to={'/'}>TalkNest</NavLink></h1>
            <h1 className='text-2xl font-bold my-6'>Dashboard</h1>
            <div className=' flex flex-col text-base-200 gap-6 asideDash'>
                {
                    dbUser?.role === 'user' ?
                        userRout :
                        adminRout
                }
                <span className='btn btn-accent w-full rounded-xl'><Logout></Logout></span>
            </div>
        </div>
    );
};

export default AsideDash;