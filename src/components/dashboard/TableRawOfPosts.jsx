import React from 'react';
import { NavLink } from 'react-router';
import { FaTrash, FaComments } from 'react-icons/fa';


const TableRawOfPosts = ({ handleDelete, post, index }) => {
    return (
        <tr className="hover:shadow bg-base-200 hover:bg-base-300">
            <td>{index + 1}</td>
            <td className='font-semibold'>{post.postTitle}</td>
            <td>{post.upVote - post.downVote}</td>
            <td>
                <NavLink to={`/comments/${post._id}`}>
                    <button className="btn btn-sm btn-info text-white flex items-center gap-1">
                        <FaComments /> Comment
                    </button>
                </NavLink>
            </td>
            <td>
                <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-sm btn-error text-white"
                >
                    <FaTrash /> Delete
                </button>
            </td>
        </tr>
    );
};

export default TableRawOfPosts;