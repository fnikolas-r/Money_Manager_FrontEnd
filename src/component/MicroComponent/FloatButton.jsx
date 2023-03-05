import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBank, faGear, faTags} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, useState} from "react";
import {Transition} from "@headlessui/react";
import {useDispatch} from "react-redux";
import {setinputmodalstatus} from "../../storage/slices/component.js";


export default function FloatButton(props) {
    const [isMenuHover, setIsMenuHover] = useState(false);
    const dispatch = useDispatch();

    return <>
        <button className="z-[100] fixed bottom-7 p-3 right-7 rounded-full bg-blue-400 w-14 h-14 peer hover:animate-spin "
                onClick={() => setIsMenuHover((prevState) => !prevState)}
        >
            <FontAwesomeIcon className="text-white text-lg" icon={faGear}/>
        </button>
        <Transition
            show={isMenuHover}
            as={Fragment}
            enter="transition-opacity duration-75 "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <ul className={"z-[1000] fixed bottom-24 right-7 "}>
                <li className="mb-3">
                    <button className="z-[1000] rounded-full bg-blue-400 w-14 h-14"
                        onClick={()=>{
                            setIsMenuHover(false)
                            dispatch(setinputmodalstatus({status:true,name:"list_rekening"}))
                        }}
                    >
                        <FontAwesomeIcon className="text-lg text-white" icon={faBank}/>
                    </button>
                </li>
                <li className="mb-3">
                    <button className="z-[1000] rounded-full bg-blue-400 w-14 h-14"
                        onClick={()=>{
                            setIsMenuHover(false)
                            dispatch(setinputmodalstatus({status:true,name:"list_kategori"}))
                        }}
                    >
                        <FontAwesomeIcon className="text-lg text-white" icon={faTags}/>
                    </button>
                </li>
                <li className="mb-3">
                    <button className="z-[1000] rounded-full bg-blue-400 w-14 h-14"
                                            onClick={()=>{
                                                setIsMenuHover(false)
                            dispatch(setinputmodalstatus({status:true,name:"input_transfer",id:null}))
                        }}
                    >
                        <FontAwesomeIcon className="text-lg text-white" icon="fa-solid fa-money-bill-transfer"/>
                    </button>
                </li>
                <li className="mb-3">
                    <button className="z-[1000] rounded-full bg-blue-400 w-14 h-14"
                    onClick={()=>{
                        setIsMenuHover(false)
                            dispatch(setinputmodalstatus({status:true,name:"input_utang_piutang",id:null}))
                        }}
                    >
                        <FontAwesomeIcon className="text-lg text-white" icon="fa-solid fa-face-meh-blank"/>
                    </button>
                </li>
            </ul>
        </Transition>

    </>
}