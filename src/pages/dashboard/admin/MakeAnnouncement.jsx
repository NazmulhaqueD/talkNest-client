import React, { useContext } from 'react';
import { AuthContext } from '../../../context/provider/AuthProvider';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { toast } from 'react-toastify';

const MakeAnnouncement = () => {


    const { user } = useContext(AuthContext);
    const axiosSecure=UseAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const announceData = Object.fromEntries(formData.entries());
        const createdAt = new Date();

        announceData.createdAt = createdAt;
        console.log(announceData)

        try {
            const res = await axiosSecure.post('/announcements', announceData);
            if (res.data.insertedId) {
                toast.success('Announcement added successfully!');
                form.reset();
            }
        } catch (error) {
            toast.error('Error posting announcement:', error);
        }
    };

    return (

        <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl lg:text-4xl text-primary font-bold mb-4 text-center">Make an Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Author Image URL</label>
                    <input
                        type="text"
                        name="authorImage"
                        value={user?.photoURL}
                        className="input input-bordered w-full"
                        placeholder="Enter image URL"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Author Name</label>
                    <input
                        type="text"
                        name="authorName"
                        value={user?.displayName}
                        className="input input-bordered w-full"
                        placeholder="Enter author name"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="input input-bordered w-full"
                        placeholder="Enter announcement title"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Description</label>
                    <textarea
                        rows={10}
                        name="description"
                        className="textarea textarea-bordered w-full resize-none"
                        placeholder="Enter announcement details"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Submit Announcement
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;