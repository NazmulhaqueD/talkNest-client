import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const ShowAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axiosSecure.get('/announcements');
                setAnnouncements(res.data);
            } catch (error) {
                console.error('Failed to load announcements:', error);
            }
        };

        fetchAnnouncements();
    }, [axiosSecure]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Latest Announcements</h2>

            {announcements.length === 0 ? (
                <p className="text-center text-gray-500">No announcements yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((announcement) => (
                        <div key={announcement._id} className="bg-white shadow-md rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <img
                                    src={announcement.authorImage}
                                    alt="Author"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold">{announcement.authorName}</h4>
                                    <p className="text-sm text-gray-500">
                                        {new Date(announcement.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{announcement.title}</h3>
                            <p className="text-gray-700">{announcement.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowAnnouncement;
