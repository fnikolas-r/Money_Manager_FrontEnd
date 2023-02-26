import React from "react";
import Logo from '../assets/logo.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';
import Bg from '../assets/bg.jpg';
import {useSelector, useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {register as sign_up} from '../storage/slices/auth.js';
import {Navigate, NavLink} from "react-router-dom";
import * as yup from "yup";
import dayjs from "dayjs";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup.js";
import YupPassword from 'yup-password'
function SignUp(props) {

YupPassword(yup)


    const handleSignUp = (formValue) => {


        dispatch(sign_up(formValue))
            .unwrap()
            .then(() => {
                console.log("Register Berhasil")
            })
            .catch(() => {
                console.log("Error")
            });
    };
    const dispatch = useDispatch();

        const schema = yup.object({
            username : yup.string().required(),
            first_name : yup.string().required(),
            last_name : yup.string().required(),
            email:yup.string().email().required(),
            password:yup.string().password().required(),
            password2:yup.string().oneOf([yup.ref("password")],"Password Harus Sama")
        }).required();

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver:yupResolver(schema)
    });
    const {isLoggedIn} = useSelector(state => state.auth);
    if(isLoggedIn){
        return <Navigate  to="/"/>
    }
    return (
        <>
            <div className="min-h-full flex">
                <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-lg lg:w-96">
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
                            <div className="mt-6">
                                <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)} method="POST">
                                    <div className="flex mt-2">
                                        <div className="grow mr-1.5">
                                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <div className="mt-1">
                                            <input autoComplete="nope"
                                                {...register("first_name", {required: true})}
                                                type="text"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                            {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name?.message}</span>}
                                    </div>
                                        <div className="grow">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <div className="mt-1">
                                            <input autoComplete="nope"
                                                {...register("last_name", {required: true})}
                                                type="text"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                            {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name?.message}</span>}
                                    </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <div className="mt-1">
                                            <input autoComplete="nope"
                                                {...register("username", {required: true})}
                                                type="text"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {errors.username && <span className="text-red-500 text-sm">{errors.username?.message}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="mt-1">
                                            <input autoComplete="nope"
                                                {...register("email", {required: true})}
                                                type="email"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {errors.email && <span className="text-red-500 text-sm">{errors.email?.message}</span>}
                                    </div>
                                        <div className="grow mr-1.5">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input autoComplete="nope"
                                                {...register("password", {required: true})}
                                                type="password"

                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {errors.password && <span className="text-red-500 text-sm">{errors.password?.message}</span>}
                                        </div>
                                    </div>
                                        <div className="grow">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Konfirmasi Password
                                        </label>
                                        <div className="mt-1">
                                            <input autoComplete="nope"
                                                {...register("password2", {required: true})}
                                                type="password"

                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        {errors.password2 && <span className="text-red-500 text-sm">{errors.password2?.message}</span>}
                                        </div>
                                    </div>


                                    <div className="text-sm content-center text-center">
                                        <NavLink to={"/auth/login"} className="font-medium text-gray-300 hover:text-gray-400">
                                            Sudah mendaftar ? Ayo Login
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

export default SignUp;