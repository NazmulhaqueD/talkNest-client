import React from 'react';
import PostList from '../../components/posts/PostList';
import ShowAnnouncements from '../../components/announcement/ShowAnnouncemnet';
import TopUsers from '../../components/topUser/TopUsers';
import NewsletterSection from '../../components/subscribe/NewsletterSection ';
import TestimonialSection from '../../components/testimonial/TestimonialSection';

const Home = () => {

    return (
        <div>
            <PostList></PostList>
            <ShowAnnouncements></ShowAnnouncements>
            <TopUsers></TopUsers>
            <TestimonialSection></TestimonialSection>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;