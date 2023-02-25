/* This example requires Tailwind CSS v2.0+ */

import {faArrowAltCircleDown,faArrowAltCircleUp} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {setinputmodalstatus} from "../../../storage/slices/component.js";
import {useDispatch} from "react-redux";


export default function Tables(props) {

    const LIST_EXCLUDE = ["id","is_protected","id_utang_piutang","id_transfer"]

  var table_name = props.header?? props.mapping(props.data)[0]? Object.keys(props.mapping(props.data)[0]).filter(key=> !LIST_EXCLUDE.includes(key)) : []
    const dispatch = useDispatch();


      

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center ">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{props.name}</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col overflow-y h-[50vh]">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {table_name.map((name,i)=>{
                      return <th key={`${name}`} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        {name}
                        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                            <span className="h-5 w-5" aria-hidden="true" ><FontAwesomeIcon icon={faArrowAltCircleDown}/></span>
                        </span>
                      </a>
                    </th>
                    })}
                  <th kescope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                            Action
                        </span>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {props.mapping(props.data).map(data=>{

                    return <tr key={data.id+"_tr"}>
                        {Object.keys(data).filter((key)=>{return !LIST_EXCLUDE.includes(key)}).map(idx_name=>{

                        return <td key={idx_name+"_"+data.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data[idx_name]}</td>
                      })
                      }
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {data.is_protected ? <div className="text-red-600">Is Protected</div> : <>
                            <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={
                                ()=>{ var jenis  = props.naming? props.naming(data) : {nama:props.category, id:data.id};
                                    console.log(jenis)

                                    dispatch(setinputmodalstatus({name:`input_${jenis.nama}`,
                                    id:jenis.id,status:true})) }
                            }>


                          Edit <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                        </button>
                          <button href="#" className="text-red-600 hover:text-indigo-900"  onClick={
                              ()=>{ var jenis  = props.naming? props.naming(data) : {nama:props.category, id:data.id};
                                  dispatch(setinputmodalstatus({name:`delete_${jenis.nama}`,
                                  id:jenis.id,status:true})) }
                          }>
                          Delete <FontAwesomeIcon icon="fa-solid fa-trash" />
                        </button>
                            </>}
                      </td>


                    </tr>
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
