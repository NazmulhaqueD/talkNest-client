import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useParams } from 'react-router';
import Loader from '../../../components/shared/Loader';

const CommentPage = () => {
    const { postId } = useParams();
    const axiosSecure = UseAxiosSecure();
    const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
    const [reportedComments, setReportedComments] = useState({});
    const [modalComment, setModalComment] = useState(null);

    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        }
    });
    console.log(comments);


    const handleFeedbackChange = (commentId, value) => {
        setSelectedFeedbacks(prev => ({ ...prev, [commentId]: value }));
    };

    const handleReport = async (commentId) => {
        await axiosSecure.patch(`/comments/report/${commentId}`, {
            feedback: selectedFeedbacks[commentId]
        });

        Swal.fire("Reported!", "The comment has been reported.", "success");

        setReportedComments(prev => ({ ...prev, [commentId]: true }));
        refetch();
    };

    if (isLoading) return <Loader></Loader>;

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl text-primary font-bold mb-6 text-center">Comments on Post</h2>
            <div className="overflow-x-auto shadow-md min-h-[60vh] shadow-primary">
                <table className="table table-auto w-full bg-base-200 rounded-lg">
                    <thead className="bg-secondary text-white text-left">
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments?.map((comment, index) => (
                            <tr key={comment._id} className="border-t hover:bg-base-200">
                                <td>{index + 1}</td>
                                <td className="whitespace-nowrap">{comment.userEmail}</td>
                                <td className="min-w-[200px]">
                                    {comment.comment.length > 20 ? (
                                        <>
                                            {comment.comment.slice(0, 20)}...
                                            <button
                                                className="text-blue-600 underline ml-2"
                                                onClick={() => setModalComment(comment.comment)}
                                            >
                                                Read More
                                            </button>
                                        </>
                                    ) : comment.comment}
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm w-full max-w-xs"
                                        value={selectedFeedbacks[comment._id] || ''}
                                        onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                    >
                                        <option value="">Select feedback</option>
                                        <option value="Inappropriate language">Inappropriate language</option>
                                        <option value="Off-topic">Off-topic</option>
                                        <option value="Spam or self-promotion">Spam or self-promotion</option>
                                        <option value="Harassment or bullying">Harassment or bullying</option>
                                        <option value="Hate speech">Hate speech</option>
                                        <option value="False information">False information</option>
                                        <option value="Violent or dangerous content">Violent or dangerous content</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        disabled={
                                            !selectedFeedbacks[comment._id] ||
                                            reportedComments[comment._id]
                                        }
                                        onClick={() => handleReport(comment._id)}
                                    >
                                        {reportedComments[comment._id] ? "Reported" : "Report"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Modal */}
            {modalComment && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h3 className="text-xl font-semibold mb-4">Full Comment</h3>
                        <p className="text-gray-800 mb-6">{modalComment}</p>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setModalComment(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentPage;
