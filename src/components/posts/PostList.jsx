import Banner from '../bannar/Bannar';
import TagSearch from '../tag/TagSearch';
import ShowPostsContainer from './ShowPostsContainer';

const PostList = () => {


    const handleSearch = (e) => {
        e.preventDefault();
        // const searchValue = e.target.searchTag?.value;
        // console.log(searchValue)
    }
    const handleTagClick = (tag) => {
        // console.log(tag);   
    }


    return (
        <div>
            <Banner handleSearch={handleSearch}></Banner>
            <TagSearch handleTagClick={handleTagClick}></TagSearch>
            <ShowPostsContainer
            ></ShowPostsContainer>
        </div>
    );
};

export default PostList;