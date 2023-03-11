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


import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";
import {add_transfer, edit_transfer, get_detail_transfer} from "../../../../../storage/slices/transfer.js";
import dayjs from "dayjs";

export default function TransferInput(props) {
    const dispatch = useDispatch();
    const rekening = useSelector(state => state.rekening);
    const rekening_data = rekening.data

    const {modalInputOpen} = useSelector(state=>state.component)
    const {detail} = useSelector(state=>state.transfer)
    const {id,before} = modalInputOpen

    const schema = yup.object({
        keterangan: yup.string().required().max(10),
        nominal: yup.number().positive().integer(),
        tgl_transfer: yup.date().required().max(dayjs().add(1,'hour').toDate()),
        from_account: yup.string().required(),
        to_account: yup.string().required().notOneOf([yup.ref('from_account'), null], 'Rekening yang dituju tidak boleh sama'),
    }).required();


    const {register, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (id) {
            if (detail.from_account_id === "") {
                dispatch(get_detail_transfer({id}))
            }
            setValue("keterangan", detail.keterangan)
            setValue("tgl_transfer", detail.tgl_transfer)
            setValue("nominal", detail.nominal)
            setValue("from_account", detail.from_account_id)
            setValue("to_account", detail.to_account_id)
        }

    }, [id, detail])

    const handle_transfer = (data) => {
        if (id) {
            dispatch(edit_transfer({...data,tgl_transfer:dayjs(data.tgl_transfer).format("YYYY-MM-DDTHH:mm").toString(), id}))
        } else {
            dispatch(add_transfer({...data,tgl_transfer:dayjs(data.tgl_transfer).format("YYYY-MM-DDTHH:mm").toString()}))
        }
    }

    return <form onSubmit={handleSubmit(handle_transfer)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Keterangan
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register("keterangan")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            <div className="sm:col-span-3 mt-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Nominal
                </label>
                <div className="mt-1">
                    <input
                        type="number"
                        {...register("nominal")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="sm:col-span-3 mt-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Tanggal Transaksi
                </label>
                <div className="mt-1">
                    <input
                        type="datetime-local"
                        {...register("tgl_transfer")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="flex mt-2">
                <div className="sm:col-span-3 mt-3 grow mr-1.5 ">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Rekening Asal
                    </label>
                    <div className="mt-1">
                        <select
                            {...register("from_account")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            {
                                rekening_data.map(item=>{
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-3 mt-3 grow">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Rekening Tujuan
                    </label>
                    <div className="mt-1">
                        <select
                            {...register("to_account")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            {
                                rekening_data.map(item=>{
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
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