import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loader from '../../../components/shared/Loader';

const ReportedComments = () => {
    const axiosSecure = UseAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;
    const [selectedComment, setSelectedComment] = useState(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['reported-comments', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reported-comments?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    if (isLoading) return <Loader />;

    const totalPages = Math.ceil(data?.count / limit);

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/reported-comments/${id}`);
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleResolve = async (id) => {
        try {
            await axiosSecure.patch(`/reported-comments/${id}`, { status: 'resolved' });
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Commenter Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.reportedComments?.map((report, index) => (
                            <tr key={report._id}>
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{report.userName}</td>
                                <td>
                                    {report.comment.length > 20 ? (
                                        <>
                                            {report.comment.slice(0, 20)}...
                                            <button
                                                className="link link-primary ml-2"
                                                onClick={() => setSelectedComment(report.comment)}
                                            >
                                                See more
                                            </button>
                                        </>
                                    ) : (
                                        report.comment
                                    )}
                                </td>
                                <td>{report.feedback}</td>
                                <td>{report.status || 'Pending'}</td>
                                <td className="space-x-2">
                                    <button onClick={() => handleResolve(report._id)} className="btn btn-sm btn-success">
                                        Resolve
                                    </button>
                                    <button onClick={() => handleDelete(report._id)} className="btn btn-sm btn-error">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedComment && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h3 className="text-lg font-bold mb-2">Full Comment</h3>
                        <p className="mb-4">{selectedComment}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setSelectedComment(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                {[...Array(totalPages).keys()].map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p + 1)}
                        className={`btn btn-sm ${page === p + 1 ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {p + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReportedComments;
