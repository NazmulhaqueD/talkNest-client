import React from 'react';
import { FaRegComments, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { NavLink } from 'react-router';

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
        commentCount
    } = post;

    const voteCount = upVote - downVote;

    // 30 word description
    const shortDescription = postDescription?.split(' ').slice(0, 15).join(' ') + '...';

    // Format time
    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <NavLink to={`/post/${post._id}`}>
            <div className="bg-white rounded-lg shadow-md h-76 p-4 space-y-3 hover:shadow-xl transition">
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
                <p className="text-gray-600">{shortDescription}</p>

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
                            <FaRegComments size={20} /> {commentCount || 0}
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
