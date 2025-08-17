import Loader from '../shared/Loader';
import PostCard from './PostCard';

const ShowPostsContainer = ({ data, isLoading, limit, setPage, page }) => {



    const posts = data?.posts;
    const totalCount = data?.total;
    const totalPages = Math.ceil(totalCount / limit);
    // console.log(posts);

    if (isLoading) return <Loader></Loader>;
    if (posts.length === 0) {
        return <>
            <div className='max-w-sm border-2 rounded-lg mx-auto mt-8 p-6 bg-base-300'>
                <h1 className='text-5xl text-error text-center py-6'>Ops!!!!!!!!!!</h1>
                <p className='text-2xl text-center'>Data is not found</p>
            </div>
        </>
    }

    return (
        <div className='bg-base-200'>
            <div className='max-w-7xl mx-auto min-h-[55vh] rounded-lg my-8 p-4'>
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
        </div>
    );
};

export default ShowPostsContainer;
