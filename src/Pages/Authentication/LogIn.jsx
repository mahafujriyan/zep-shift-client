import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogIn from './SociallogIn';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';

const LogIn = () => {
       const { register, handleSubmit, formState: { errors } } = useForm();
        const{singIn}=useContext(AuthContext)
        const navigate=useNavigate()
        const location=useLocation()
         const from = location.state?.from || '/';

    const onSubmit = data => {
    singIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from);
            })
            .catch(error => console.log(error))
    }
    return (
         <div className="card bg-base-100 w-full  mx-auto max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input" placeholder="Email" />


                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website? <Link className="btn btn-link" to="/singUp">Register</Link></small></p>
                </form>
                <SocialLogIn></SocialLogIn>
            </div>
        </div>
    );
};

export default LogIn;