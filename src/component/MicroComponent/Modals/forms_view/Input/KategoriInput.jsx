//
// export default function RekeningInput(props) {
//     return <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
//             <div className="sm:col-span-3">
//               <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
//                 First name
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="first-name"
//                   id="first-name"
//                   autoComplete="given-name"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//
//             <div className="sm:col-span-3">
//               <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
//                 Last name
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="last-name"
//                   id="last-name"
//                   autoComplete="family-name"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//
//             <div className="sm:col-span-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//
//             <div className="sm:col-span-3">
//               <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                 Country
//               </label>
//               <div className="mt-1">
//                 <select
//                   id="country"
//                   name="country"
//                   autoComplete="country-name"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 >
//                   <option>United States</option>
//                   <option>Canada</option>
//                   <option>Mexico</option>
//                 </select>
//               </div>
//             </div>
//
//             <div className="sm:col-span-6">
//               <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
//                 Street address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="street-address"
//                   id="street-address"
//                   autoComplete="street-address"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//
//             <div className="sm:col-span-2">
//               <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                 City
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="city"
//                   id="city"
//                   autoComplete="address-level2"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//
//             <div className="sm:col-span-2">
//               <label htmlFor="region" className="block text-sm font-medium text-gray-700">
//                 State / Province
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="region"
//                   id="region"
//                   autoComplete="address-level1"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//
//             <div className="sm:col-span-2">
//               <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
//                 ZIP / Postal code
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="postal-code"
//                   id="postal-code"
//                   autoComplete="postal-code"
//                   className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//           </div>
// }
import {Combobox} from '@headlessui/react'
import {useEffect, useState} from 'react'
import fonts from './fontawesome_list_free.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {edit_kategori, add_kategori, get_detail_kategori, change_icon} from "../../../../../storage/slices/kategori.js";
import {modalbackto} from "../../../../../storage/slices/component.js";

export default function KategoriInput(props) {
    const dispatch = useDispatch();

    const modal = useSelector(state => state.component)
    const kategori = useSelector(state => state.kategori)
    const {detail} = kategori;
    const selectedIcon = detail.icon??""
    const [query, setQuery] = useState('')
    const {id,before} = modal.modalInputOpen;




    const filteredIcons =
        query === ''
            ? []
            : fonts.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            }).slice(0,5)

        const schema = yup.object({
          name: yup.string().required().max(50),
          icon: yup.string()
        }).required();

        const {register, setValue,handleSubmit, formState: {errors}} = useForm({
            resolver:yupResolver(schema),
            })

    const handle_kategori = (data)=> {
        const {name, icon} = data;
        if(id){
            dispatch(edit_kategori({id, name, icon}))
        }else{
            dispatch(add_kategori({name,icon}))
        }
    }


    useEffect(()=>{
        if(id){
            if( detail.name===""){dispatch(get_detail_kategori({id}))}
            setValue("name",detail.name)
            setValue("icon",detail.icon)
        }

    },[id,detail])

    useEffect(() => {
        console.log(selectedIcon)
        setValue("icon",selectedIcon)
    }, [selectedIcon]);


    return <form onSubmit={handleSubmit(handle_kategori)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3 mt-2">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                Nama Kategori
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    {...register("name")}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
            </div>
        </div>

        <div className="sm:col-span-3 mt-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Icon {selectedIcon !==""?<FontAwesomeIcon className="grow" icon={selectedIcon}/> : <></>}
            </label>
            <input type="hidden" {...register("icon")}/>
            <div className="mt-1">
                <Combobox value={selectedIcon} onChange={(val)=>{dispatch(change_icon(val))}}
                >
                    <Combobox.Input onChange={(event) => setQuery(event.target.value)}
                                    className="shadow-sm
                                    focus:ring-indigo-500 focus:border-indigo-500
                                     block w-full sm:text-sm border-gray-300
                                     rounded-md grow-3"

                    />
                    <Combobox.Options
                        className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <Combobox.Option key={null} value={""}
                                             className="text-sm py-2
                                             px-4 font-normal block w-full whitespace-nowrap
                                             bg-transparent text-gray-700 hover:bg-gray-100"
                            >
                                ---
                            </Combobox.Option>
                        {filteredIcons.map((icon) => (
                            <Combobox.Option key={icon} value={icon}
                                             className="text-sm py-2
                                             px-4 font-normal block w-full whitespace-nowrap
                                             bg-transparent text-gray-700 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={icon}/> | {icon}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>

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
                                            if(before){
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