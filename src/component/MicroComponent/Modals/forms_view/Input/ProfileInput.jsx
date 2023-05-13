import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect} from "react";
import {update_profile} from "../../../../../storage/slices/auth.js";

export default function ProfileInput(props) {
    const default_validation = {
        "email":yup.string().email().required(),
        "bio":yup.string().max(500),
        "first_name":yup.string().required(),
        "last_name":yup.string().required()
    }

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);


    const modal = useSelector(state => state.component)
    const {before} = modal.modalInputOpen;

    const schema = yup.object().shape(default_validation)




    const {register, getValues, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
            setValue("first_name", user.first_name)
            setValue("last_name", user.last_name)
            setValue("email", user.email)
            setValue("bio", user.bio)
    }, [])
    const handle_profile = (data) => {
        dispatch(update_profile(data));
    }

    return <form onSubmit={handleSubmit(handle_profile)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="flex mt-3 ">
                <div className="sm:col-span-4 grow mr-1.5">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register("first_name")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.fist_name && <span className="text-red-500 text-sm">{errors.fist_name?.message}</span>}
                    </div>
                </div>
                <div className="sm:col-span-4 grow">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register("last_name")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.fist_name && <span className="text-red-500 text-sm">{errors.fist_name?.message}</span>}
                    </div>
                </div>
            </div>
            <div className="sm:col-span-4 mt-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register("email")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email?.message}</span>}
                    </div>
                </div>
            <div className="sm:col-span-4 mt-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Bio
                    </label>
                    <div className="mt-1">
                        <textarea
                            {...register("bio")}
                            rows={5}
                            className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.bio && <span className="text-red-500 text-sm">{errors.bio?.message}</span>}
                    </div>
                </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            >
                Save
            </button>
            <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={() => {
                    if (before) {
                        return dispatch(modalbackto(before));
                    }

                    return dispatch(resetinputmodal());
                }}

            >
                Cancel
            </button>
        </div>

    </form>
}