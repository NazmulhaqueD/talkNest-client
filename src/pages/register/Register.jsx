import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/provider/AuthProvider';
import LoginByGoogle from '../../components/loginByGoogle/LoginByGoogle';

const Register = () => {

    const { signUp, setUser, profileUpdate } = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const registerData = Object.fromEntries(formData.entries());
        const { email, password, name, photo } = registerData;

        // password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 6 characters long and include uppercase, lowercase letter.");
            return;
        }

        // signUp functionality
        signUp(email, password)
            .then(result => {
                setUser(result.user);
                profileUpdate(name, photo)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: 'Your Registration is successfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    })
                    .catch(error => {
                        toast.error(`${error.message}`)
                    })

            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (

        <div className="card bg-base-100 w-full mx-auto my-16 max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl md:text-4xl text-primary font-bold text-center mt-6">Register now!</h1>
            <div className="card-body">
                <form onSubmit={handleSignUp} className='space-y-4'>
                    <label className="label">Name</label>
                    <input required type="text" name='name' className="input" placeholder="Your Name" />

                    <label className="label">Photo</label>
                    <input required type="text" name='photo' className="input" placeholder="Photo Url" />
                    <label className="label">Email</label>
                    <input required type="email" name='email' className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input required type="password" name='password' className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button type='submit' className="btn btn-primary w-full mt-4">Register</button>
                    <LoginByGoogle></LoginByGoogle>
                    <p>Already have an account? <NavLink to='/login' className={'text-accent underline font-semibold'}>Login</NavLink></p>
                </form>
            </div>
        </div>
    );
};

export default Register;