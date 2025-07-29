import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { AuthContext } from '../../../context/provider/AuthProvider';
import TableRawOfPosts from '../../../components/dashboard/TableRawOfPosts';
import Swal from 'sweetalert2';

const MyPosts = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: myPosts = [], refetch } = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user/${user?.email}`);
            return res.data;
        }
    });
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/posts/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Post deleted successfully");
                refetch();

                await Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        }
    };


    return (
        <div className="overflow-x-auto max-w-7xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-bold my-4 text-primary text-center">My Posts</h2>
            <div className='bg-base-200 min-h-[60vh] shadow-lg'>
                <table className="table w-full">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Votes</th>
                            <th>Comment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPosts.length === 0 && (
                                <p className="text-center mt-4 text-4xl text-gray-500">You haven't posted anything yet.</p>
                            )
                        }
                        {myPosts.map((post, index) => <TableRawOfPosts
                            key={post._id}
                            post={post}
                            handleDelete={handleDelete}
                            index={index}
                        ></TableRawOfPosts>)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyPosts;
