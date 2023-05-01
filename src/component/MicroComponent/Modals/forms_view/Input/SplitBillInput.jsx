import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import {add_utangpiutang, edit_utangpiutang, split_bills} from "../../../../../storage/slices/utang_piutang.js";
import {useState,useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SplitBillInput(props) {
    const pick = (obj, ...args) => ({
      ...args.reduce((res, key) => ({ ...res, [key]: obj[key] }), { })
    })
    const default_validation = {
        "due_date": yup.date().min(new Date()),
        "type": yup.string().required(),
        "tgl_transaksi": yup.date().max(dayjs().add(1, 'hour').toDate()).required(),
        "keterangan": yup.string().max(50),
        "biaya_awal":yup.number().positive().required(),
        "rekening": yup.string().required()
    }

    const dispatch = useDispatch();
    const rekening = useSelector(state => state.rekening);
    const rekening_data = rekening.data


    const [billInputs, setBillInputs] = useState([
        1
    ]);

    const add_name = () => {
        setBillInputs(prevState => [...prevState, Math.max(...prevState)+1])
    }


    const {register, getValues,setValue, unregister, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(yup.object().shape({
        ...default_validation, ...billInputs.reduce((acc, curr) => ({
            ...acc,
            ['person' + curr]: yup.string().max(30),
            ['amt' + curr]:  yup.number().integer().positive().required()
        }), {})
    })),
    })
    useEffect(() => {
        console.log(billInputs)
            const total = getValues("biaya_awal")
            const price = total  > 0 ? Math.round((total)/billInputs.length) : 0
            billInputs.forEach(value => {
                setValue("amt"+value,price)
            })
    }, [billInputs,add_name]);

    const handle_split_bill = (data) => {
        const bills = billInputs.map(value => {
            return {"amt":getValues('amt'+value),"person":getValues("person"+value)}
        })
        const request_val = {...pick(data,'due_date','type','tgl_transaksi','keterangan','rekening'),'split_bills':bills}

        console.log(request_val)
        dispatch(split_bills(request_val))

    }

    return <form onSubmit={handleSubmit(handle_split_bill)}>
        <div className="mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="flex mt-2">
                <div className="sm:col-span-3 grow mr-1.5">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Peruntukan
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            {...register("keterangan")}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3  grow mr-1.5 ">
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
                <div className="sm:col-span-3 grow">
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

            <div className="flex mt-2">
                <div className="sm:col-span-3 mt-3 grow mr-2">
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
                <div className="sm:col-span-3 mt-3 grow">
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
            </div>
            <div className="sm:col-span-3 mt-2">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Nominal Awal
                </label>
                <div className="mt-1">
                    <input
                        type="number"
                        {...register("biaya_awal")}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="mt-3 border border-gray-200 p-3">
                <h2 className="font-bold">Rincian</h2>
                <div className="max-h-[200pt] overflow-auto ">
                    {billInputs.map(v => (
                <div key={v} className="flex mt-2">
                    <div className="sm:col-span-3 grow mr-1.5">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Pelaku Terkait
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                {...register("person"+v)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 grow">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Nominal
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                {...register("amt"+v)}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    {v != 1 ? <div className="sm:col-span-1 grow justify-center align-center flex items-center mt-5">
                        <button type={"button"} className="text-red-500 hover:text-red-600"
                            onClick={()=>{
                                setBillInputs(prevState => prevState.filter(value => (v!=value)))
                                unregister("person"+v)
                                unregister("amt"+v)
                            }}
                        ><FontAwesomeIcon
                            icon="fa-solid fa-trash"/></button>
                    </div> : <></>}
                </div>
            ))}
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:grid flex justify-center">
                <button type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                        onClick={add_name}
                >Tambahkan Orang
                </button>
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