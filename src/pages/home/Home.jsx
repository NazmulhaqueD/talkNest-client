import React from 'react';
import PostList from '../../components/posts/PostList';
import ShowAnnouncements from '../../components/announcement/ShowAnnouncemnet';
import TopUsers from '../../components/topUser/TopUsers';

const Home = () => {

    return (
        <div>
            <PostList></PostList>
            <ShowAnnouncements></ShowAnnouncements>
            <TopUsers></TopUsers>
        </div>
    );
};

export default Home;