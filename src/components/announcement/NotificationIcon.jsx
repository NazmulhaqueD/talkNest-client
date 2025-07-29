import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { Bell } from 'lucide-react';

const NotificationIcon = () => {
    const axiosSecure = UseAxiosSecure();
    const { data } = useQuery({
        queryKey: ['announcementCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data?.count || 0;
        }
    });

    return (
        <div id='notification' className="relative">
            <Bell size={30} className="w-6 h-6 text-accent" />
            {data > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {data}
                </span>
            )}
        </div>
    );
};

export default NotificationIcon;
