import {modalbackto, resetinputmodal} from "../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup.js";
import {set_lunas_utangpiutang} from "../../../../storage/slices/utang_piutang.js";

export default function SetDoneModals(props) {
    const modal = useSelector(state => state.component)
    const {id,before} = modal.modalInputOpen;
    const {data} = useSelector(state => state.rekening)
    const utangpiutang = useSelector(state => state.utangpiutang)

    const saat_ini = utangpiutang.data.filter(v=>id?v.id==id:true)




    const dispatch = useDispatch();
    const {register, getValues,setValue,handleSubmit, formState: {errors}} = useForm()

    const handle_set_done = (data) =>{
        dispatch(set_lunas_utangpiutang({id:id,tujuan:data.rekening_tujuan}));
    }
    return <div>
        {saat_ini[0].is_done? <button
                type="submit"
                onClick={()=>{
                    dispatch(set_lunas_utangpiutang({id:id,tujuan:null}))
                }}
                className="w-full inline-flex mb-3 mt-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                Batalkan Tandai Lunas
            </button>:
            <form onSubmit={handleSubmit(handle_set_done)}>
                <div className="sm:col-span-3 mt-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Pilih Rekening
                    </label>
                </div>
                <div className="mt-1 mb-5">
                    <select {...register("rekening_tujuan")}
                        defaultValue={saat_ini?saat_ini[0].rekening_id:null}
                            className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"}>
                    {data.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                </div>

            <button
                type="submit"
                className="w-full inline-flex mb-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                Tandai Lunas
            </button>
            <button
                type="reset"
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
            </form>}

    </div>;
}