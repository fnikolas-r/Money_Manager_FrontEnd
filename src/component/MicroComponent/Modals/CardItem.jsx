/* This example requires Tailwind CSS v2.0+ */

import {faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';
import {useDispatch} from "react-redux";
import {setinputmodalstatus} from "../../../storage/slices/component.js";

export default function CardItem(props) {
    const dispatch = useDispatch();

    let icon = null
    if(props.icon){
        icon = props.icon
    }else{
        icon = "fa-money-bill"
    }
    const props_icon = "fa-solid "+icon
    
    
  return (
    <div className="bg-white px-1 py-3 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <FontAwesomeIcon className="text-2xl text-blue-400" icon={props_icon} />
        </div>
         <div className="ml-4 mt-4 grow">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{props.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
              {props.summary.map(i=>{
                  return <span key={uuid()}>{i}<br/></span>
              })}
          </p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
            <div className="grid grid-col-1">
          <button type="button" className="relative inline-flex items-center px-2
          py-2 border border-transparent shadow-sm text-sm font-medium rounded-md
          text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
          focus:ring-offset-2 focus:ring-indigo-500"
          onClick={()=>{dispatch(setinputmodalstatus({name:"delete_"+props.name,id:props.id,before:props.before,detail:{name:props.title}}))}}
          >
            <FontAwesomeIcon icon="fa-solid fa-trash"
            />
          </button>
          <button onClick={()=>{dispatch(setinputmodalstatus({name:"input_"+props.name, id:props.id,before:props.before,detail:{name:props.title}}))}}
              type="button" className="mt-2 relative inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FontAwesomeIcon icon="fa-solid fa-edit"/>
          </button>
            </div>
        </div>
      </div>
    </div>
  )
}
