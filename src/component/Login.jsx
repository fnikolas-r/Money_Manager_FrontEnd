import React from "react";
import Logo from '../assets/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {login,login_by_google, logout} from '../storage/slices/auth.js';
import {Navigate, NavLink} from "react-router-dom";
import Bg from '../assets/bg.jpg';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

function Login(props) {
    const dispatch = useDispatch()
    const HandleGoogleLogin = useGoogleLogin({
        onSuccess: (response) => GoogleLoginSuccess(response),
        onError: (error) => console.log('Login Failed:', error)
    })

    const GoogleLoginSuccess = (user) => {
        const t = user.access_token
        dispatch(login_by_google({t}))
            .unwrap()
            .then(() => {
                console.log("Login Berhasil")
            })
            .catch(() => {
                console.log("Error")
            });
    }
    const handleLogin = (formValue) => {
        const {username, password} = formValue;

        dispatch(login({username, password}))
            .unwrap()
            .then(() => {
                console.log("Login Berhasil")
            })
            .catch(() => {
                console.log("Error")
            });
    };

    if (props.logout) {
        dispatch(logout())
        return <Login/>
    }
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {isLoggedIn} = useSelector(state => state.auth);
    if (isLoggedIn) {
        return <Navigate to="/"/>
    }
    return (
        <>

            <div className="min-h-[100vh] flex">
                <div className="flex-1 flex flex-col justify-center py-24 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-12 w-auto"
                                src={Logo}
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Masuk Akun Keuangan</h2>
                            <p className="mt-2 text-sm text-gray-600">
                            </p>
                        </div>

                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Atau login dengan </p>
                                    <div className="mt-1 grid grid-cols-2 gap-3">

                                        <div>
                                            <button
                                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                type={"button"}
                                                onClick={() => HandleGoogleLogin()}
                                            >
                                                <FontAwesomeIcon icon="fa-brands fa-google"/>
                                                <span className="sr-only">Sign in with Google</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">atau daftar dengan</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <form className="space-y-6" onSubmit={handleSubmit(handleLogin)} method="POST">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                {...register("username", {required: true})}
                                                type="text"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                {...register("password", {required: true})}
                                                type="password"

                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-sm content-center text-center">
                                        <NavLink to={"/auth/register"}
                                                 className="font-medium text-gray-300 hover:text-gray-400">
                                            Belum Buat Akun? Ayo Daftar
                                        </NavLink>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={Bg}
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}

export default Login;