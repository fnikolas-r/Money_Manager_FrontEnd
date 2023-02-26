import {createSlice} from "@reduxjs/toolkit";
import {toast} from 'react-toastify';

const messageSlice = createSlice({
    name : "message_all",
    initialState:{message:null,status:null},
    reducers :{
        setMessage : (state, action)=>{
            state.message = action.payload.message
            state.status = action.payload.status

            const toast_option = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }

            switch (state.status) {
                case 400:
                    toast.error(action.payload.message, toast_option)
                    break;
                case 200:
                    toast.success(action.payload.message,toast_option)
                    break;
            }

        },

        clearMessage: (state)=>{
            state.message = null
        },

    }
})

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;