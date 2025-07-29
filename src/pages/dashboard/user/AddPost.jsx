import React, { useContext } from 'react';
import { AuthContext } from '../../../context/provider/AuthProvider';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import BecomeMemberPage from '../../../components/dashboard/BecomeMemberPage ';

const AddPost = () => {

    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);
    const date = new Date();


    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        }
    });

    const { data: myPosts, refetch } = useQuery({
        queryKey: ['myPostsCount', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count?email=${user?.email}`);
            return res.data;
        }
    });

    const { data: dbUser } = useQuery({
        queryKey: ['dbUser', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data;
        }
    })

    console.log(myPosts, dbUser)

    const handleAddPost = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const postData = Object.fromEntries(formData.entries());
        postData.upVote = 0;
        postData.downVote = 0;
        postData.authorImage = user?.photoURL;
        postData.date = date;

        axiosSecure.post('/posts', postData)
            .then(res => {
                if (res.data?.insertedId) {
                    toast.success('Your post has been successfully')
                    refetch()
                    form.reset();
                }
            })
            .catch(error => {
                toast.error(error.message)
            })

        console.log(postData);
    };


    const isEligible = myPosts?.postCount >= 5 && dbUser?.badge === "bronze";


    if (isEligible) {
        return <BecomeMemberPage></BecomeMemberPage>
    }


    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-md">
            <h2 className="text-2xl text-primary font-semibold mb-6 text-center">Add New Post</h2>
            <form onSubmit={handleAddPost} className="space-y-4">

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Author Name</legend>
                    <input type="text" className="input w-full" required value={user?.displayName} name='authorName' />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Author Email</legend>
                    <input type="email" className="input w-full" required name='authorEmail' value={user?.email} readOnly />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Post Title</legend>
                    <input type="text" className="input w-full" required name='postTitle' />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Post Description</legend>
                    <textarea className="input w-full resize-none h-auto" required name='postDescription' rows={'6'}></textarea>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Tag</legend>
                    <select className="input w-full" required name='tag'>
                        <option value="">Select a tag</option>
                        {
                            tags.map(tag=><option value={tag?.name}>{tag.name}</option>)
                        }
                    </select>
                </fieldset>

                <button type="submit" className="btn w-full btn-primary">Add Post</button>
            </form>

        </div>
    );
};

export default AddPost;
