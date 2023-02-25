import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {add_rekening, edit_rekeneing, get_detail_rekening} from "../../../../../storage/slices/rekening.js";
import {useEffect} from "react";
import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {login} from "../../../../../storage/slices/auth.js";

export default function RekeningInput(props) {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.component)
    const rekening = useSelector(state => state.rekening)
    const {detail} = rekening;
    const {id,before} = modal.modalInputOpen;


    const schema = yup.object({
      name: yup.string().required().max(50),
      initial_deposit: yup.number().positive().integer().required(),
        is_hidden:yup.boolean().default(false)
    }).required();

    const {register, setValue,handleSubmit, watch, formState: {errors}} = useForm({
        resolver:yupResolver(schema),
        })
    ;
    useEffect(()=>{
        if(id){
            if( detail.name==""){dispatch(get_detail_rekening({id}))}
            setValue("name",detail.name)
            setValue("initial_deposit",detail.initial_deposit)
            setValue("is_hidden",detail.is_hidden)
        }
    },[id,detail])

    const handle_rekening = (data)=> {
        const {name, is_hidden, initial_deposit} = data;

        if(id){
            dispatch(edit_rekeneing({id, name, is_hidden, initial_deposit}))
        }else{
            dispatch(add_rekening({name,is_hidden,initial_deposit}))
        }
    }


    return <form onSubmit={handleSubmit(handle_rekening)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3 mt-2">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                Nama Rekening
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
                Saldo Awal
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  {...register("initial_deposit")}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Jenis
              </label>
              <div className="mt-1">
                <select
                  {...register("is_hidden")}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value={false}>Regular Account</option>
                  <option value={true}>Hidden Account</option>
                </select>
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