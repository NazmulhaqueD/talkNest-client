import React, { useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { AuthContext } from '../../context/provider/AuthProvider';

const PostDetails = () => {
  const { _id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext)
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient();

  const shareUrl = `${window.location.origin}/post/${_id}`;

  // Fetch post details
  const { data: post = {}, refetch } = useQuery({
    queryKey: ['postDetails', _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${_id}`);
      return res.data;
    }
  });

  const { data: commentCountData } = useQuery({
    queryKey: ['commentCount', _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/count/${_id}`);
      return res.data;
    },
    enabled: !!_id,
  });

  const handleUpvote = async () => {
    if (!user) return toast.error("Please login first");
    await axiosSecure.patch(`/posts/${_id}/upvote`);
    toast.success('Upvoted!');
    refetch();
    queryClient.invalidateQueries(['posts']);
  };

  const handleDownvote = async () => {
    if (!user) return toast.error("Please login first");
    await axiosSecure.patch(`/posts/${_id}/downvote`);
    toast.success('Downvoted!');
    refetch();
    queryClient.invalidateQueries(['posts']);
  };


  const handleComment = async () => {
    if (!user) return toast.error("Login to comment");
    if (!commentText) return;

    await axiosSecure.post(`/posts/${_id}/comment`, {
      comment: commentText,
      userName: user.displayName,
      userImage: user.photoURL,
      userEmail: user.email,
    });

    toast.success("Comment added!");
    setCommentText('');
    refetch();
    queryClient.invalidateQueries(['posts']);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-base-300 shadow-md rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <img referrerPolicy='no-referrer' src={post?.authorImage} alt="author" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{post.authorName}</p>
            <p className="text-sm text-gray-500">{new Date(post.date).toLocaleString()}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{post.postTitle}</h2>
        <p className="text-gray-700 mb-4">{post.postDescription}</p>

        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded">
            #{post.tag}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleUpvote} className="flex items-center gap-1 text-green-600">
            <FaArrowUp /> {post.upVote || 0}
          </button>
          <button onClick={handleDownvote} className="flex items-center gap-1 text-red-600">
            <FaArrowDown /> {post.downVote || 0}
          </button>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Comments ({commentCountData.count || 0})</h3>

          <div className="mb-4">
            <textarea
              className="w-full border rounded-md p-2 resize-none"
              rows="8"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            ></textarea>
            <button
              onClick={handleComment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Comment
            </button>
          </div>

          <div className="space-y-4">
            {post.comments?.map((cmt, i) => (
              <div key={i} className="flex gap-3 items-start">
                <img src={cmt.userImage} alt="user" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium">{cmt.userName}</p>
                  <p className="text-gray-700">{cmt.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetails;
