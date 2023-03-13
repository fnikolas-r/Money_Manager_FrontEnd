/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {useDispatch,useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faListAlt, faPlusSquare, faWindowClose} from '@fortawesome/free-regular-svg-icons'
import Logo from '../../../assets/logo.png'
import logo from '../../../assets/logo.png'
import NavbarMenu from "./NavbarMenu";
import {set_hidden_status, setinputmodalstatus} from "../../../storage/slices/component.js";
import {logout} from "../../../storage/slices/auth.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const MENUITEM = [
    {key: 1, link: "/", name: "Home"},
    {key: 2, link: "/summary/", name: "Statistik"},
]




export default function Navbar() {
    var dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);
    const {show_hidden_account} = useSelector(state => state.component);
    const name =`${user.first_name} ${user.last_name}`
    const select_show_hidden = ()=> {
    return <div className="border-indigo-500  text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                                        <select className="relative inline-flex items-center border border-transparent
                                           text-sm rounded-md
                                        " onChange={val => {
                                        dispatch(set_hidden_status(val.target.value == 'true'))
                                    }}
                                                defaultValue={show_hidden_account}
                                        >
                                        <option value={false} defaultValue={true}>Sembunyikan Rekening Hidden</option>
                                        <option value={true}>Tampilkan Rekening Hidden</option>
                                    </select>
                                    </div>

}
    return (
        <Disclosure as="nav" className="bg-white shadow z-100">
            {({open}) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <FontAwesomeIcon icon={faWindowClose}/>
                                        ) : (
                                            <FontAwesomeIcon icon={faListAlt}/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src={Logo}
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src={Logo}
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    {MENUITEM.map((item) => (
                                        <NavbarMenu {...item} />
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex md:items-center">
                                <div className="flex-shrink-0">
                                    {select_show_hidden()}
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        type="button"
                                        className="relative inline-flex items-center px-4 py-2
                                        border border-transparent text-sm font-medium rounded-md
                                        text-white bg-indigo-600 shadow-sm hover:bg-indigo-700
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-indigo-500"
                                        onClick={() => {
                                            dispatch(setinputmodalstatus({status: true, name: "input_transaksi"}))
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlusSquare}/>
                                        <span className="ml-3">Transaksi Baru</span>
                                    </button>
                                </div>
                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                                    <button
                                        type="button"
                                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <i className="h-6 w-6">
                                            <FontAwesomeIcon icon={faBell}/>
                                        </i>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button
                                                className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute
                      right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black
                      z-100
                       ring-opacity-5 focus:outline-none">

                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="react_moneymgr/src/component/MicroComponent/Navbar/Navbar.jsx#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href="react_moneymgr/src/component/MicroComponent/Navbar/Navbar.jsx#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                            onClick={() => {
                                                                dispatch(logout())
                                                            }}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            {
                                MENUITEM.map(item => {
                                    return <Disclosure.Button
                                        as="a"
                                        href={item.link}
                                        key={item.key}
                                        className={({isActive}) => (isActive ? 'border-b-2 ' : ' ') + " text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                })
                            }

                        </div>
                        <div className="md:hidden mb-5">
                            {select_show_hidden()}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4 sm:px-6">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={logo}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{name}</div>
                                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <FontAwesomeIcon icon={faBell}/>
                                </button>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Disclosure.Button
                                    as="div"
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                                >
                                    Your Profile
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                                >
                                    Settings
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                                    onClick={() => {
                                        dispatch(logout())
                                    }}
                                >
                                    <span>Sign out</span>
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
