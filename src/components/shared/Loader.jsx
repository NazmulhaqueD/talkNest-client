import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-[70vh]'>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    );
};

export default Loader;