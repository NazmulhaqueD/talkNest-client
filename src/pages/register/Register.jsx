import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/provider/AuthProvider';
import LoginByGoogle from '../../components/loginByGoogle/LoginByGoogle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Divider from '../../components/shared/Divider';

const Register = () => {

    const { signUp, profileUpdate } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = data => {
        const { name, email, photo, password } = data;
        signUp(email, password)
            .then(result => {

                if (result?.user) {
                    profileUpdate(name, photo)
                        .then(() => {
                            const newUser = {
                                name: result?.user?.displayName,
                                email: result?.user?.email,
                                image: result?.user?.photoURL,
                                badge: "bronze",
                                role: "user",
                                isMember: false
                            }
                            axiosSecure.post('/users', newUser)
                                .then(res => {
                                    console.log(res.data);
                                    navigate('/')
                                    Swal.fire({
                                        icon: "success",
                                        title: 'Your Registration is successfully',
                                        showConfirmButton: false,
                                        timer: 2000
                                    });
                                })
                        })
                        .catch(error => {
                            toast.error(`${error.message}`)
                        })
                }
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (

        <div className="card bg-base-200 w-full mx-auto my-16 max-w-sm shrink-0 shadow-sm shadow-accent">
            <h1 className="text-3xl md:text-4xl text-primary font-bold text-center mt-6">Register now!</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

                    <label className="label">Name</label>
                    <input {...register('name')} required type="text" name='name' className="input" placeholder="Your Name" />

                    <label className="label">Photo</label>
                    <input {...register('photo')} required type="text" name='photo' className="input" placeholder="Photo Url" />

                    <label className="label">Email</label>
                    <input {...register('email')} required type="email" name='email' className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input {...register('password')} required type="password" name='password' className="input" placeholder="Password" />

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button type='submit' className="btn btn-primary w-full mt-4">Register</button>

                    <Divider></Divider>

                    <LoginByGoogle></LoginByGoogle>
                    <p>Already have an account? <NavLink to='/login' className={'text-accent underline font-semibold'}>Login</NavLink></p>

                </form>
            </div>
        </div>
    );
};

export default Register;