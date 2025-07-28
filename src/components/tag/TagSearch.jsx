import React from 'react';

const TagSearch = ({ handleTagClick }) => {
    const tags = ['technology', 'lifestyle', 'education', 'health'];

    return (
        <section className="my-2 px-4 flex justify-center gap-4">
            {
                tags.map((tag, index) => <button
                    onClick={()=>handleTagClick(tag)}
                    key={index}
                    className='btn btn-accent rounded-lg btn-sm focus:btn-primary'
                >{tag}</button>)
            }
        </section>
    );
};

export default TagSearch;
