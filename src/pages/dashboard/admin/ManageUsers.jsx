import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data = {}, refetch } = useQuery({
        queryKey: ['users', page, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${page}&limit=10&search=${search}`);
            return res.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        refetch();
    };

    const handleMakeAdmin = async (id) => {
        await axiosSecure.patch(`/users/admin/${id}`);
        refetch();
    }

    return (
        <div className="p-4 max-w-7xl mx-auto bg-base-200 mt-8 rounded-lg min-h-[60vh]">
            <form onSubmit={handleSearch} className="mb-4 flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered mr-2"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.users?.map((user, index) => (
                            <tr key={user._id}>
                                <td>{(page - 1) * 10 + index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="text-green-600 font-bold">Admin</span>
                                    ) : (
                                        <button 
                                        onClick={()=>handleMakeAdmin(user?._id)}
                                        className="btn btn-sm btn-warning"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.isMember ? 'Member' : 'Free'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {[...Array(data.totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        className={`btn btn-sm mx-1 ${page === num + 1 ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setPage(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
