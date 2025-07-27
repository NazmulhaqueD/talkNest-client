import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const ShowPostsContainer = ({ search, tag }) => {

    const [page, setPage] = useState(1);
    const limit = 5;
    const axiosSecure = UseAxiosSecure();
    console.log(search, tag);
    

    const { data, isLoading } = useQuery({
        queryKey: ['posts', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?limit=${limit}&page=${page}&search=${page}`);
            return res.data;
        },
    });

    const posts = data?.posts;
    const totalCount = data?.total;
    const totalPages = Math.ceil(totalCount / limit);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-4">
                {posts?.map((post) => (
                    <div key={post._id} className="border p-4 rounded">
                        <h2 className="text-xl font-bold">{post.postTitle}</h2>
                        <p>{post.postDescription.slice(0, 100)}...</p>
                    </div>
                ))}
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
