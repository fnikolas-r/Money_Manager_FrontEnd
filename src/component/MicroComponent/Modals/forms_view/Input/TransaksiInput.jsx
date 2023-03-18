
import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {logout} from "../../../../../storage/slices/auth.js";
import {add_kategori, edit_kategori, get_detail_kategori} from "../../../../../storage/slices/kategori.js";
import {add_transaksi, edit_transaksi, get_detail_transaksi} from "../../../../../storage/slices/transaksi.js";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

export default function TransaksiInput(props) {
    const dispatch  = useDispatch();
    const rekening = useSelector(state => state.rekening);
    const rekening_data = rekening.data
    const modal = useSelector(state => state.component)
    const {id,before} = modal.modalInputOpen;
    const kategori = useSelector(state => state.kategori);
    const kategori_data = kategori.data
    const schema = yup.object({
          trc_name: yup.string().required().max(50),
          pelaku: yup.string().max(30),
          price: yup.number().integer().nonNullable().required(),
        trc_type:yup.number().required(),
        trc_date:yup.date().required().max(dayjs().add(1,'hour').toDate()),
        rekening:yup.string().required(),
        kategori:yup.string().required(),
        }).required();
    const transaksi = useSelector(state => state.transaksi)
    const {detail} = transaksi;

    const [trc_type, setTrc_type] = useState("1");


    const {register, getValues,setValue,handleSubmit, formState: {errors}} = useForm({
            resolver:yupResolver(schema),
            })
    useEffect(()=>{
        if(id){
            if( detail.trc_name===""){dispatch(get_detail_transaksi({id}))}
            setValue("trc_name",detail.trc_name)
            setValue("pelaku",detail.pelaku)
            setValue("price",detail.price)
            setValue("trc_type",detail.trc_type)
            setValue("trc_date",detail.trc_date)
            setValue("rekening",detail.rekening_id)
            setValue("kategori",detail.kategori_id)
        }

    },[id,detail])
    const handle_transaksi = (data)=> {
        console.log(data)
        if(id){
            dispatch(edit_transaksi({...data,trc_date:dayjs(data.trc_date).format("YYYY-MM-DDTHH:mm").toString(),id}))
        }else{
            dispatch(add_transaksi({...data,trc_date:dayjs(data.trc_date).format("YYYY-MM-DDTHH:mm").toString()}))
        }
    }


    return <form onSubmit={handleSubmit(handle_transaksi)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="flex mt-2">
            <div className="sm:col-span-3 grow mr-1.5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Nama Transaksi
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        {...register("trc_name")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="sm:col-span-3 grow">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Pelaku Terkait
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        {...register("pelaku")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </div>
        <div className="sm:col-span-3 mt-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Harga
            </label>
            <div className="mt-1">
                <input
                    type="number"
                    {...register("price")}
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
                    {...register("trc_date")}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
            </div>
        </div>
        <div className="sm:col-span-3 mt-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Rekening
            </label>
            <div className="mt-1">
                <select
                    {...register("rekening")}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                    {rekening_data.map(item=>{
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                </select>
            </div>
        </div>
        <div className="flex mt-2">
            <div className="sm:col-span-3 mt-3 grow mr-1.5 ">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Jenis
                </label>
                <div className="mt-1">
                    <select
                        {...register("trc_type")}
                        onChange={(event)=>{
                            setTrc_type(event.target.value)
                        }}
                        defaultValue={"1"}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                        <option value={"1"}>Pendapatan</option>
                        <option value={"-1"}>Pengeluaran</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-3 mt-3 grow">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Kategori
                </label>
                <div className="mt-1">
                    <select
                        {...register("kategori")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                    {kategori_data.filter((val)=>(val.jenis==trc_type || val.jenis==null)).map(item=>{
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })}
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