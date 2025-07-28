import { useState } from 'react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Banner from '../bannar/Bannar';
import TagSearch from '../tag/TagSearch';
import ShowPostsContainer from './ShowPostsContainer';
import { useQuery } from '@tanstack/react-query';


const PostList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('');
    const limit = 5;
    const axiosSecure = UseAxiosSecure();


    // data loading by query by tanstack query
    const { data, isLoading } = useQuery({
        queryKey: ['posts', page, search, tag],
        queryFn: async () => {
            let url = `/posts?limit=${limit}&page=${page}`;
            if (search) url += `&search=${encodeURIComponent(search)}`;
            if (tag) url += `&tag=${encodeURIComponent(tag)}`;
            const res = await axiosSecure.get(url);
            return res.data;
        },
    });



    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.searchTag.value;
        setSearch(searchText);
        setTag('');
        setPage(1);
    };
    const handleTagClick = (tag) => {
        setTag(tag);
        setSearch('');
        setPage(1);
        console.log(tag);
        
    }






    return (
        <div>
            <Banner handleSearch={handleSearch} ></Banner>
            <TagSearch handleTagClick={handleTagClick}></TagSearch>
            <ShowPostsContainer data={data} isLoading={isLoading} setPage={setPage} limit={limit} page={page} />
        </div>
    );
};

export default PostList;