import React from 'react';
import { NavLink } from 'react-router';

const BecomeMemberPage = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-lg px-4 text-center">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">You are Almost There!</h2>
        <p className="text-gray-600 mb-6">
          You have created 5 posts and earned the <span className="font-semibold text-yellow-600">Bronze</span> badge.
        </p>
        <p className="text-gray-700 mb-6">
          To become a verified member and unlock full features, please complete your membership registration.
        </p>
        <NavLink to="/membership-form">
          <NavLink to={'/membership'} className="btn btn-primary font-semibold py-2 px-6 rounded-lg transition duration-200">
            Become a Member
          </NavLink>
        </NavLink>
      </div>
    </div>
  );
};

export default BecomeMemberPage;
