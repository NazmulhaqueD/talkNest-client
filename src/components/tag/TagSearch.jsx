import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Loader from '../shared/Loader';

const TagSearch = ({ handleTagClick }) => {
    const axiosSecure = UseAxiosSecure();

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <section className="my-2 px-4 flex justify-center gap-4">
            {
                tags.map((tag, index) => (
                    <button
                        onClick={() => handleTagClick(tag)}
                        key={index}
                        className='btn btn-accent rounded-lg btn-sm focus:btn-primary'
                    >{tag}</button>
                ))
            }
        </section>
    );
};

export default TagSearch;
