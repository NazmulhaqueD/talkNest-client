import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {

    const { setUser, signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // firebase login here 
        signIn(email, password)
            .then(result => {
                setUser(result.user);
                Swal.fire({
                    icon: "success",
                    title: `Welcome ${result?.user?.displayName}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(`${location?.state ? location.state : '/'}`)
            })
            .catch(error => {
                toast(error)
            })
    }      

    return (
        <div className="card bg-base-200 w-full mx-auto min-h-[65vh] my-16 max-w-sm shrink-0 shadow-sm shadow-accent">
            <h1 className="text-3xl md:text-4xl text-primary font-bold text-center mt-6">Login now!</h1>
            <div className="card-body">
                <form onSubmit={handleLogin} className='space-y-4'>
                    <label className="label">Email</label>
                    <input type="email" name='email' className="input" required placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" name='password' className="input" required placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button type='submit' className="btn btn-neutral w-full mt-4">Login</button>
                    <p>Don't have an account? <NavLink to={'/register'} className={'text-teal-400 underline font-semibold '}>Register</NavLink></p>
                </form>
            </div>
        </div>
    );
};

export default Login;