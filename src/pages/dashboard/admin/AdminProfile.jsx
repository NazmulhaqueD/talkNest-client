import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/provider/AuthProvider';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [tagName, setTagName] = useState('');

    const { data: stats = {}, refetch } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
    });

    const { postCount = 0, commentCount = 0, userCount = 0 } = stats;

    const pieData = [
        { name: 'Posts', value: postCount },
        { name: 'Comments', value: commentCount },
        { name: 'Users', value: userCount },
    ];

    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tagName) return toast.error('Tag name required');

        const res = await axiosSecure.post('/tags', { name: tagName });
        if (res.data.insertedId) {
            toast.success('Tag added successfully');
            setTagName('');
            refetch();
        }
    };

    return (
        <section className="max-w-4xl mx-auto py-10 px-4">
            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <div className="flex items-center space-x-6">
                    <img
                        src={user?.photoURL}
                        alt="Admin"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        <div className="mt-2 space-y-1">
                            <p>Posts: {postCount}</p>
                            <p>Comments: {commentCount}</p>
                            <p>Users: {userCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <h3 className="text-xl font-semibold mb-4">Site Statistics</h3>
                <PieChart width={300} height={300}>
                    <Pie
                        data={pieData}
                        cx={150}
                        cy={150}
                        labelLine={false}
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Add New Tag</h3>
                <form onSubmit={handleAddTag} className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Enter tag name"
                        className="input input-bordered w-full max-w-xs"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                        Add Tag
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AdminProfile;
