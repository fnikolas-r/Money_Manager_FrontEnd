import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {update_profile_photo} from "../../../../../storage/slices/auth.js";

export default function UploadPhoto(props) {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);


    const modal = useSelector(state => state.component)
    const {before} = modal.modalInputOpen;

    useEffect(() => {
    }, [])
    const handle_profile = async(event) => {
        event.preventDefault()
        console.log(file)
        dispatch(update_profile_photo({file}));
    }

    return <form onSubmit={handle_profile}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4 grow mt-3">
                <label htmlFor="first-name" className="text-center block text-sm font-medium text-gray-700">
                        Foto Saat Ini
                </label>
                <div className="h-20 w-20 rounded-full shadow-xl mx-auto bg-cover bg-center flex items-center justify-center" style={{
                                backgroundImage: `url('${user.photo ?? `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.user_id}moneymanager`}')`
                }}></div>
            </div>
            <div className="sm:col-span-4 grow mt-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Upload Foto Baru
                    </label>
                    <div className="mt-1">
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={event => {setFile(event.target.files[0])}}
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid
                            border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700
                             transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden
                              file:rounded-none file:border-0 file:border-solid file:
                               file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition
                               file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]
                               hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary
                               focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700
                               dark:file:text-neutral-100 dark:focus:border-primary"
                        />
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