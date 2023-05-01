
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {setinputmodalstatus} from "../../../../storage/slices/component.js";
import { v4 as uuid } from 'uuid';

export default function ListMenu(props) {
    const BEFORE = "input_extra_menu"
    const dispatch = useDispatch();
    const data = [
        { name: "Split Bill", icon: "fa-solid fa-barcode", desc: "Memudahkan penambahan utang piutang" ,action:()=>{
                dispatch(setinputmodalstatus({name:"input_split_bill",before:BEFORE}));
            }},
    ]
    return <>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Daftar Menu Extra</h3>
        <div className="bg-white shadow overflow-y-auto h-96 rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {data.map(val => (<li key={uuid()} className="px-6 py-4">
                    <button className="w-full text-left bg-white px-1 py-3 border-b border-gray-200 sm:px-6" onClick={val.action}>
                        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <FontAwesomeIcon className="text-2xl text-blue-400" icon={val.icon} />
                            </div>
                            <div className="ml-4 mt-4 grow">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{val.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {val.desc}
                                </p>
                            </div>
                        </div>
                    </button>
                </li>))}
            </ul>
        </div>
    </>
}