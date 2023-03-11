import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {logout} from "../../../../../storage/slices/auth.js";
import {add_kategori, edit_kategori, get_detail_kategori} from "../../../../../storage/slices/kategori.js";
import {add_transaksi, edit_transaksi, get_detail_transaksi} from "../../../../../storage/slices/transaksi.js";
import {useEffect} from "react";
import dayjs from "dayjs";
import {get_detail_transfer} from "../../../../../storage/slices/transfer.js";
import {
    add_utangpiutang,
    edit_utangpiutang,
    get_detail_utangpiutang
} from "../../../../../storage/slices/utang_piutang.js";


export default function UtangPiutangInput(props) {
    const default_validation = {
        "due_date": yup.date().min(new Date()),
        "person_in_charge": yup.string().max(30),
        "type": yup.string().required(),
        "tgl_transaksi": yup.date().max(dayjs().add(1, 'hour').toDate()).required(),
        "nominal": yup.number().integer().positive().required(),
        "keterangan": yup.string().max(50),
        "rekening": yup.string().required()
    }

    const dispatch = useDispatch();
    const rekening = useSelector(state => state.rekening);
    const rekening_data = rekening.data

    const modal = useSelector(state => state.component)
    const {id, before} = modal.modalInputOpen;

    const schema = yup.object().required(default_validation)

    const utang_piutang = useSelector(state => state.utangpiutang)
    const {detail} = utang_piutang;


    const {register, getValues, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (id) {
            if (detail.nominal === null) {
                dispatch(get_detail_utangpiutang({id}))
            }
                setValue("due_date", detail.due_date)
                setValue("person_in_charge", detail.person_in_charge)
                setValue("type", detail.type)
                setValue("tgl_transaksi", detail.tgl_transaksi)
                setValue("nominal", detail.nominal)
                setValue("keterangan", detail.keterangan)
                setValue("rekening", detail.rekening_id)
        }

    }, [id, detail])
    const handle_utang_piutang = (data) => {
        console.log(data)
        if (id) {
            dispatch(edit_utangpiutang({...data, id,tgl_transaksi:dayjs(data.tgl_transaksi).format("YYYY-MM-DDTHH:mm").toString()}))
        } else {
            dispatch(add_utangpiutang({...data,tgl_transaksi:dayjs(data.tgl_transaksi).format("YYYY-MM-DDTHH:mm").toString()}))
        }
    }
    return <form onSubmit={handleSubmit(handle_utang_piutang)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Nominal {getValues("type")}
                </label>
                <div className="mt-1">
                    <input
                        type="number"
                        {...register("nominal")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="flex mt-2">
                <div className="sm:col-span-3 grow mr-1.5">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Pelaku Terkait
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register("person_in_charge")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3 grow">
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
            </div>
            <div className="sm:col-span-3 mt-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Tanggal Transaksi
                </label>
                <div className="mt-1">
                    <input
                        type="datetime-local"
                        {...register("tgl_transaksi")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="sm:col-span-3 mt-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Tanggal Jatuh Tempo
                </label>
                <div className="mt-1">
                    <input
                        type="datetime-local"
                        {...register("due_date")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="flex mt-2">
                <div className="sm:col-span-3 mt-3 grow mr-1.5 ">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Jenis
                    </label>
                    <div className="mt-1">
                        <select
                            {...register("type")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value={"U"}>Utang</option>
                            <option value={"P"}>Piutang</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-3 mt-3 grow">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Rekening
                    </label>
                    <div className="mt-1">
                        <select
                            {...register("rekening")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            {rekening_data.map(item => {
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