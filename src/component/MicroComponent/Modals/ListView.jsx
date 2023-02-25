import {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {setinputmodalstatus} from "../../../storage/slices/component.js";

export default function ListView(props) {

    const [stroke, setStroke] = useState("");
    const dispatch = useDispatch()
    return <>

        <div className="mb-3">
            <div className="flex flex-wrap w-full mb-3 justify-end">
                                <button
                    className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="button" id="button-addon2"
                                onClick={()=>{
                                    dispatch(setinputmodalstatus({name:"add_"+props.name,id:null,before:props.before}))
                                }}
                                >
                                    Tambah Baru
                                    <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                </button>
            </div>
            <div className="flex flex-wrap w-full mb-4">
                <input type="search"
                       className="grow mr-3 relative  min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                       placeholder="Search" aria-label="Search" aria-describedby="button-addon2"
                       onChange={(event) => {
                           setStroke(event.target.value)

                       }
                       }
                />
                <button
                    className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="button" id="button-addon2">
                    <FontAwesomeIcon icon="fa-solid fa-search"/>
                </button>
            </div>
        </div>

        <div className="bg-white shadow overflow-y-auto h-96 rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {
                    (props.mapping(props.item).filter(value => {
                        const keys = Object.keys(value)
                        if(stroke==""){return true}
                        let stats = false
                        for (const valueElement of keys) {
                            if (valueElement == "key" || valueElement == "id") {
                                continue
                            } else if (valueElement == "summary") {
                                stats += value["summary"].join(" ").includes(stroke.toLowerCase())
                                continue
                            }
                            stats += value[valueElement].toLowerCase().includes(stroke.toLowerCase())
                        }
                        return stats
                    }).map((data) => (
                        <li key={data.id} className="px-6 py-4">
                            {props.function(data)}
                        </li>
                    )))
                }
            </ul>
        </div>
    </>
}
