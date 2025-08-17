import { FaRegComments, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { NavLink } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PostCard = ({ post }) => {
    const {
        postTitle,
        postDescription,
        tag,
        authorImage,
        authorName,
        date,
        upVote,
        downVote,
        _id
    } = post;

    const axiosSecure = UseAxiosSecure();
    const voteCount = upVote - downVote;
    const shortDescription = postDescription?.split(' ').slice(0, 15).join(' ') + '...';
    const formattedDate = new Date(date).toLocaleDateString();
    
    
    
    const { data: commentCountData } = useQuery({
        queryKey: ['commentCount', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/count/${_id}`);
            return res.data;
        },
        enabled: !!_id,
    });
    
    console.log(_id,commentCountData);

    return (
        <NavLink to={`/post/${post._id}`}>
            <div className="bg-base-100 rounded-lg shadow-md p-4 space-y-3 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                    <img referrerPolicy='no-referrer' src={authorImage} alt="author" className="w-10 h-10 rounded-full" />
                    <div>
                        <h3 className="font-semibold">{authorName}</h3>
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800">{postTitle}</h2>

                {/* Description */}
                <p className="text-gray-600 flex-grow">{shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
                        #{tag}
                    </span>
                </div>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between text-sm mt-3">
                    <div className="flex items-center gap-3 text-gray-600">
                        <div className="flex items-center gap-1">
                            <FaRegComments size={20} /> {commentCountData?.count || 0}
                        </div>
                        <div className="flex items-center gap-1">
                            <FaArrowUp size={20} className="text-green-500" /> {upVote}
                        </div>
                        <div className="flex items-center gap-1">
                            <FaArrowDown size={20} className="text-red-500" /> {downVote}
                        </div>
                    </div>
                    <span className="text-gray-700 font-semibold">
                        Total Votes: {voteCount}
                    </span>
                </div>
            </div>
        </NavLink>
    );
};

export default PostCard;
