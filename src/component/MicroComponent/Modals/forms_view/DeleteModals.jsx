import {modalbackto, resetinputmodal} from "../../../../storage/slices/component.js";
import {useDispatch, useSelector} from "react-redux";

export default function DeleteModals(props) {
    const modal = useSelector(state => state.component)
    const {id,before} = modal.modalInputOpen;
    const dispatch = useDispatch();

    return <div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
                type="button"
                onClick={()=>{
                    dispatch(props.dispatcher({id}));
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                Delete
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
    </div>;
}