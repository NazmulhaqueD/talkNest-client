import React, { useState } from 'react';
import Banner from '../bannar/Bannar';
import TagSearch from '../tag/TagSearch';
import ShowPostsContainer from './ShowPostsContainer';

const PostList = () => {

    const [tag, setTag] = useState('')
    const [search, setSearch] = useState();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.searchTag.value)
        
    }
    const handleTagClick = (tag) => {
        setTag(tag)
    }


    return (
        <div>
            <Banner handleSearch={handleSearch}></Banner>
            <TagSearch handleTagClick={handleTagClick}></TagSearch>
            <ShowPostsContainer
                tag={tag}
                search={search}
            ></ShowPostsContainer>
        </div>
    );
};

export default PostList;