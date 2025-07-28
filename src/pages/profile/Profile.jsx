import React, { useContext } from 'react';
import { AuthContext } from '../../context/provider/AuthProvider';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AdminProfile from '../dashboard/admin/AdminProfile';
import UserProfile from '../dashboard/user/UserProfile';

const Profile = () => {


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
    if (isLoading) return <Loader></Loader>;

    console.log(dbUser);
    if (dbUser.role === "admin") {
        return <AdminProfile></AdminProfile>
    }
    else {
        return <UserProfile></UserProfile>
    }
};

export default Profile;