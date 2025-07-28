import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaMedal } from 'react-icons/fa';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { AuthContext } from '../../../context/provider/AuthProvider';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    // Get user data from database
    const { data: dbUser = {} } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Get user posts
    const { data: myPosts = [] } = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    console.log(dbUser);
    console.log(myPosts);


    const badgeType = dbUser?.isMember ? 'gold' : 'bronze';
    const badgeText = dbUser?.badge;


    return (
        <section className="max-w-7xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-8 lg:pb-16">
            <div className="flex flex-col items-center gap-4 text-center">
                <img referrerPolicy='no-referrer' src={dbUser?.image} alt="User" className="w-24 h-24 rounded-full" />
                <h2 className="text-2xl font-semibold">{dbUser?.name}</h2>
                <p className="text-gray-500">{dbUser?.email}</p>

                <div className="flex items-center gap-2 mt-2">
                    <FaMedal
                        className={badgeType === 'gold' ? 'text-yellow-500 text-2xl' : 'text-orange-500 text-2xl'}
                    />
                    <span className="font-medium">{badgeText}</span>
                </div>
            </div>

            <hr className="my-6" />

            <div>
                <h3 className="text-xl lg:text-4xl font-semibold text-primary mb-4 text-center">My Recent Posts</h3>
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myPosts.slice(0, 3).map(post => (
                        <div key={post._id} className="p-4 py-6 bg-white rounded-md shadow h-full flex flex-col">
                            <h4 className="text-xl font-bold pb-4">#{post.postTitle}</h4>
                            <p className="text-gray-600 flex-grow">{post.postDescription?.slice(0, 100)}...</p>
                            <div className='flex justify-between items-center  mt-3'>
                                <p className="text-sm font-semibold text-secondary">
                                <span className='text-accent'>Tag:</span> {post.tag}</p>
                                <p>{new Date(post.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {myPosts.length === 0 && (
                        <p className="text-center text-gray-500">No posts found.</p>
                    )}
                </div>

            </div>
        </section>
    );
};

export default UserProfile;
