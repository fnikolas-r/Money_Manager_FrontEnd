import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name : "message_all",
    initialState:{message:null,status:null},
    reducers :{
        setMessage : (state, action)=>{
            state.message = action.payload.message
            state.status = action.payload.status
        },

        clearMessage: (state)=>{
            state.message = null
        },

    }
})

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;