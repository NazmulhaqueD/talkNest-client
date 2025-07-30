import { Loader } from 'lucide-react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import PostCard from './PostCard';

const ShowPostsContainer = ({ data, isLoading, limit, setPage, page }) => {


    
    const posts = data?.posts;
    const totalCount = data?.total;
    const totalPages = Math.ceil(totalCount / limit);
    console.log(posts);

    if (isLoading) return <Loader></Loader>;

    return (
        <div className='max-w-7xl mx-auto bg-base-300 min-h-[55vh] rounded-lg my-8 p-4'>
            <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
