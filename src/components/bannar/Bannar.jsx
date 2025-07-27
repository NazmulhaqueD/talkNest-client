import React, { useState } from 'react';

const Banner = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            onSearch(searchTerm); // Call parent function to fetch data from backend
        }
    };

    return (
        <section className="bg-gradient-to-r from-base-200 to-gray-300 py-12 px-6 text-center rounded-xl shadow-md">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Search Posts by Tag
                </h1>
                <form onSubmit={handleSearch} className="flex items-center justify-center gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter tag name..."
                        className="px-4 py-2 w-full max-w-md rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Banner;
