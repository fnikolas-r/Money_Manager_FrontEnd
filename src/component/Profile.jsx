import Navbar from "./MicroComponent/Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "react-tooltip"
import {delete_profile_photo, link_google, login_by_google, unlink_google} from "../storage/slices/auth.js";
import {setinputmodalstatus} from "../storage/slices/component.js";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import {useGoogleLogin} from '@react-oauth/google';

function Profile(props) {
    const {user} = useSelector(state => state.auth);
    const MySwal = withReactContent(Swal);
    const name = `${user.first_name} ${user.last_name}`

    const HandleGoogleLink = useGoogleLogin({
        onSuccess: (response) => GoogleLoginSuccess(response),
        onError: (error) => console.log('Login Failed:', error)
    })
    const photo = user.photo ? String(import.meta.env.VITE_API_URL).replace("/api/",user.photo) : null
    const GoogleLoginSuccess = (user) => {
        const t = user.access_token
        dispatch(link_google({t}))
    }
    const dispatch = useDispatch()
    return <>
        <Navbar/>
        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 -z-100">


            <div id="profile"
                 className="w-full lg:w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 -z-100">
                <div className="p-4 md:p-12 text-center lg:text-left">

                    <div
                        className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center flex justify-center items-center group"
                        style={{
                            backgroundImage: `url('${photo ??
                            `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.user_id}moneymanager`}')`
                        }}>
                        <div className="content-center flex-col">
                            {photo ? <button
                                className=" hidden group-hover:block  border border-2 bg-red-500 text-white rounded-md p-0.5 text-sm">
                                <b>Remove Photo</b></button> : <></>}
                            <button
                                className=" hidden group-hover:block absolute border border-2 bg-white rounded-md p-0.5 mt-2 text-sm"
                                onClick={() => {
                                    dispatch(setinputmodalstatus({"name": "upload_profile_photo"}))
                                }}
                            >
                                <b>Update Photo</b></button>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="lg:grow w-full lg:w-10/12"><h1 className="text-3xl font-bold pt-8 lg:pt-0">{name}</h1></div>
                        <div className="lg:grow-0 lg:w-2/12 w-full place-self-end">
                            <button onClick={() => {
                                dispatch(setinputmodalstatus({"name": "input_profile"}))
                            }}><i>Ubah Profil</i></button>
                        </div>
                    </div>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25 mb-4"></div>
                    <div className="flex">
                        <div className="lg:w-3/4 w-full">

                            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                <svg className="h-4 fill-current text-indigo-700 pr-4"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/>
                                </svg>
                                My Username {user.username}
                            </p>
                            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                                <svg className="h-4 fill-current text-indigo-700 pr-4"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"/>
                                </svg>
                                My Email {user.email}
                            </p>
                            <p className="pt-8 text-sm">{user.bio ?? "Tulislah Sesuatu Tentang Dirimu"}</p>


                        </div>
                        <div className="lg:w-1/4 hidden lg:block  group">
                            <div
                                className="h-48 w-48 rounded-full shadow-xl mx-auto bg-cover bg-center flex items-center justify-center"
                                style={{
                                    backgroundImage: `url('${photo ?? `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.user_id}moneymanager`}')`
                                }}>
                                <div className="content-center flex-col">
                                    {photo ? <button
                                        className=" hidden group-hover:block  border border-2 bg-red-500 text-white rounded-md p-0.5 text-sm"
                                        onClick={() => {
                                            dispatch(delete_profile_photo())
                                        }}
                                    >
                                        <b>Remove Photo</b></button> : <></>}
                                    <button
                                        className=" hidden group-hover:block border border-2 bg-white rounded-md p-0.5 mt-2 text-sm"
                                        onClick={() => {
                                            dispatch(setinputmodalstatus({"name": "upload_profile_photo"}))
                                        }}
                                    >
                                        <b>Update Photo</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 pb-8">
                        {user.google_data ?
                            <button
                                className="text-center bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-full"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={`Terhubung Dengan Email ${JSON.parse(user.google_data).email}`}
                                data-tooltip-place="top"
                                onClick={() => {
                                    MySwal.fire({
                                        title: 'Hapus Tautan',
                                        text:"Apakah Anda Ingin Menghapus Tautan Google dengan Email : "+JSON.parse(user.google_data).email,
                                        showDenyButton: true,
                                        denyButtonText:"Batalkan",
                                        confirmButtonText: 'Hapus',
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {
                                            dispatch(unlink_google())
                                        }
                                    })
                                }}
                            >
                                Terhubung Dengan Google
                            </button> :
                            <button
                                className="bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-full"
                                onClick={()=>{HandleGoogleLink()}}
                            >
                                <FontAwesomeIcon icon={"fa-brands fa-google"}/> Hubungkan Dengan Google
                            </button>
                        }
                        <Tooltip id="my-tooltip"/>
                    </div>
                </div>

            </div>

        </div>
    </>
}

export default Profile;