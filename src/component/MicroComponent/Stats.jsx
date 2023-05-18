/* This example requires Tailwind CSS v2.0+ */
import {faArrowDown, faArrowUp, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {set_rekening_pinned} from "../../storage/slices/rekening.js";


export default function Stats(props) {
    const {isLoading} = useSelector(state => state.rekening);
    const set_pinned = () => {
        dispatch(set_rekening_pinned({pk: props.rekening}))
    }

    const dispatch = useDispatch()
    return (
        <div
            className={
                `z-0 relative bg-white pt-5 px-4 pb-12 ${props.color ?? ""} sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden md:w-[30vw] sm:w-[50vw]`
            }
        >
            <div>
                <div
                    className={`absolute rounded-md p-3 select-none ${props.color ? 'bg-white text-black' : 'bg-indigo-500 text-white'}`}>
                    <i className="h-6 w-6 " aria-hidden="true">
                        <FontAwesomeIcon icon={props.icon ?? faMoneyBill}/>
                    </i>
                </div>
                <p className={`ml-16 text-sm font-medium ${props.color ? 'text-white' : 'text-gray-500'} truncate`}>{props.name}</p>
            </div>
            <div className="ml-16 pb-6 flex items-baseline sm:pb-7 ">
                <p className={`text-2xl font-semibold select-none ${props.color ? 'text-white' : 'text-gray-900'}`}>{new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR"
                }).format(props.total)}
                    <span className="text-sm">
            {/*{props.total > 0 ? (*/}
                        {/*  <i className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true">*/}
                        {/*    <FontAwesomeIcon icon={faArrowUp} />*/}
                        {/*  </i>*/}
                        {/*) : (<i className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true">*/}
                        {/*  <FontAwesomeIcon icon={faArrowDown} />*/}
                        {/*</i>)}*/}

                        {/*<span className="sr-only">{props.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>*/}
                        {/*{props.change}*/}
          </span>
                </p>
                {props.enabled?
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="flex justify-items-stretch">
                        <div className="text-sm grow ">
                            <button href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                {' '}
                                View all<span className="sr-only"> {props.name} stats</span>
                            </button>
                        </div>
                        <div className="text-sm grow-0 justify-self-right">
                            {isLoading.summary == props.rekening ? (<>
                                <FontAwesomeIcon icon="fa-solid fa-spinner" className="animate-spin"/>
                            </>) : props.pinned ?
                                <button className="cursor-pointer" onClick={set_pinned}><FontAwesomeIcon
                                    className="text-red-500 rotate-45" icon="fa-solid fa-thumbtack"/></button> :
                                <button className="cursor-pointer font-medium text-green-600 hover:text-green-500"
                                        onClick={set_pinned}
                                >
                                    <sub>Pin this Account ?</sub>
                                </button>
                            }
                        </div>
                    </div>
                </div>:<></>
                }
            </div>
        </div>
    )
}
