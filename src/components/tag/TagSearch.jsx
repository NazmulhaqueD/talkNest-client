import React from 'react';

const TagSearch = ({ handleTagClick }) => {
    const tags = ['Technology', 'Lifestyle', 'Education', 'Health'];

    return (
        <section className="my-2 px-4 flex justify-center gap-4">
            {
                tags.map(tag => <button
                    onClick={()=>handleTagClick(tag)}
                    key={tag}
                    className='btn btn-accent rounded-lg btn-sm'
                >{tag}</button>)
            }
        </section>
    );
};

export default TagSearch;
