import React from 'react';

const TagSearch = ({ handleTagClick }) => {
    const tags = ['Technology', 'Lifestyle', 'Education', 'Health'];

    return (
        <section className="my-2 px-4 flex justify-center gap-6">
            {
                tags.map(tag=><button key={tag}
                className='btn btn-primary rounded-lg btn-sm'
                >{tag}</button>)
            }
        </section>
    );
};

export default TagSearch;
