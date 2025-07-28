import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import PostCard from './PostCard';

const ShowPostsContainer = () => {

    const [page, setPage] = useState(1);
    const limit = 5;
    const axiosSecure = UseAxiosSecure();


    const { data, isLoading } = useQuery({
        queryKey: ['posts', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?limit=${limit}&page=${page}`);
            return res.data;
        },
    });

    const posts = data?.posts;
    const totalCount = data?.total;
    const totalPages = Math.ceil(totalCount / limit);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='max-w-7xl mx-auto bg-base-300 rounded-lg p-4'>
            <div className="max-w-7xl mx-auto my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {posts?.map((post) => <PostCard
                    key={post._id}
                    post={post}
                ></PostCard>)}
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {[...Array(totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`px-3 py-1 border rounded ${page === num + 1 ? 'bg-blue-500 text-white' : ''
                            }`}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShowPostsContainer;
