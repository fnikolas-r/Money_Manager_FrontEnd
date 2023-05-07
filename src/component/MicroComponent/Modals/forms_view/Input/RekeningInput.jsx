import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {add_rekening, edit_rekeneing, get_detail_rekening} from "../../../../../storage/slices/rekening.js";
import {useEffect, useState} from "react";
import {modalbackto, resetinputmodal} from "../../../../../storage/slices/component.js";
import {login} from "../../../../../storage/slices/auth.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Combobox} from "@headlessui/react";
import {change_icon} from "../../../../../storage/slices/rekening.js";
import fonts from "./fontawesome_list_free.json";

export default function RekeningInput(props) {
    const dispatch = useDispatch();

    const modal = useSelector(state => state.component)
    const rekening = useSelector(state => state.rekening)
    const {detail} = rekening;
    const {id, before} = modal.modalInputOpen;
    const selectedIcon = detail.icon ?? ""
    const [query, setQuery] = useState('')


    const filteredIcons =
        query === ''
            ? []
            : fonts.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            }).slice(0, 5)

    const schema = yup.object().shape({
        name: yup.string().required().max(50),
        initial_deposit: yup.number().positive().integer().required(),
        is_hidden: yup.boolean().default(false)
    });

    const {register, setValue, handleSubmit, watch, formState: {errors}} = useForm({
            resolver: yupResolver(schema),
        })
    ;
    useEffect(() => {
        if (id) {
            if (detail.name == "") {
                dispatch(get_detail_rekening({id}))
            }
            setValue("name", detail.name)
            setValue("initial_deposit", detail.initial_deposit)
            setValue("is_hidden", detail.is_hidden)
            setValue("icon", detail.icon)
        }
    }, [id, detail])

    useEffect(() => {

        setValue("icon",selectedIcon)
    }, [selectedIcon]);
    const handle_rekening = (data) => {
        const {name, is_hidden, initial_deposit,icon} = data;

        if (id) {
            dispatch(edit_rekeneing({id, name, is_hidden, initial_deposit,icon}))
        } else {
            dispatch(add_rekening({name, is_hidden, initial_deposit,icon}))
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
                    {errors.name && <span className="text-red-500 text-sm">{errors.name?.message}</span>}
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
                    {errors.initial_deposit && <span className="text-red-500 text-sm">{errors.initial_deposit?.message}</span>}
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
                    {errors.is_hidden && <span className="text-red-500 text-sm">{errors.is_hidden?.message}</span>}
                </div>
            </div>

        <div className="sm:col-span-3 mt-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Icon {selectedIcon !== "" ? <FontAwesomeIcon className="grow" icon={selectedIcon}/> : <></>}
            </label>
            <input type="hidden" {...register("icon")}/>
            <div className="mt-1">
                <Combobox value={selectedIcon} onChange={(val) => {
                    dispatch(change_icon(val))
                }}
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