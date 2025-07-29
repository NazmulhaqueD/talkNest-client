import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();
    const handleError = () => {
        navigate(-1);
    }
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className='bg-gray-200 p-16 rounded-lg'>

                <h1 className='text-center text-5xl my-4'>Page Not Found</h1>
                <div>
                    <img className='w-[400px] rounded-full' src="https://i.postimg.cc/Z0kBMGP5/istockphoto-1404059706-2048x2048.jpg" alt="" />
                </div>
                <div className='flex justify-center'>
                    <button onClick={handleError} className='btn btn-primary my-8'>BackToAgain</button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;