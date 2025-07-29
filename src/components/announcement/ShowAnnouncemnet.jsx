// Announcements.jsx
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const ShowAnnouncements = () => {
    const axiosSecure = UseAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (!data?.announcements?.length) return null; 

    return (
        <section className="p-4 bg-base-200 max-w-7xl mx-auto rounded-xl shadow-lg my-16">
            <h2 className="text-2xl lg:text-4xl text-primary text-center font-bold my-6">📢 Announcements</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6">
                {data.announcements.map((announcement) => (
                    <div key={announcement._id} className="bg-white p-4 rounded-lg shadow-sm hover:bg-base-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-2">
                            <img referrerPolicy='no-referrer' src={announcement.authorImage} alt="Author" className="w-10 h-10 rounded-full" />
                            <p className="font-semibold">{announcement.authorName}</p>
                        </div>
                        <h3 className="text-xl font-bold">{announcement.title}</h3>
                        <p className="text-gray-700">{announcement.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShowAnnouncements;
