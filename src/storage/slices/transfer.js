import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import DataServices from "../../services/data.service.js";
import {setMessage} from "./messages.js";
import {get_rekening, get_summary_rekening} from "./rekening.js";
import {resetinputmodal} from "./component.js";
import {get_transaksi} from "./transaksi.js";

const call_back = (e,thunkAPI)=>{
    const pesan1 = (e.response.data.keterangan ?? "") + (e.response.data.tgl_transfer ?? "") + (e.response.data.nominal ?? "") +
        (e.response.data.from_account ?? "")  + (e.response.data.to_account ?? "")

    const message = (e.response && (pesan1 == "" ? null : pesan1)) || e.response.data.detail || e.toString();
    thunkAPI.dispatch(setMessage({status: 400, message: message}));
    return thunkAPI.rejectWithValue("Terjadi Kesalahan");
}

export const add_transfer = createAsyncThunk("transfer/add", async ({keterangan,tgl_transfer,nominal,from_account,to_account}, thunkAPI) => {
        try {

            const data = await DataServices.Transfer.add(keterangan,tgl_transfer,nominal,from_account,to_account);
            thunkAPI.dispatch(get_rekening())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(resetinputmodal())
            return data;

        } catch (e) {
            return call_back(e,thunkAPI)
        }
    })
export const edit_transfer = createAsyncThunk("transfer/edit", async ({id,keterangan,tgl_transfer,nominal,from_account,to_account}, thunkAPI) => {

        try {
            const data = await DataServices.Transfer.put(id,keterangan,tgl_transfer,nominal,from_account,to_account);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(resetinputmodal())

            return data;
        } catch (e) {
            call_back(e,thunkAPI)
        }
    })
export const delete_transfer = createAsyncThunk("transfer/delete", async ({id}, thunkAPI) => {
        try {
            const data = await DataServices.Transfer.delete(id);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(resetinputmodal())
            return data
        } catch (e) {
            const message = e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })
export const get_transfer = createAsyncThunk('transfer/get', async (_, thunkAPI) => {
    try {
        const data = await DataServices.Transfer.get();
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const get_detail_transfer = createAsyncThunk('transfer/detail', async ({id}, thunkAPI) => {
    try {
        const data = await DataServices.Transfer.get(id);
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})

const firststate = {keterangan:"",tgl_transfer:"",nominal:"",from_account_id:"",to_account_id:""}
const initialState = {
    detail:null,
    data:[]
}

const transfer = createSlice({
    name:"transfer",
    initialState,
    extraReducers:{
        [get_transfer.fulfilled] : (state,actions) =>{
            state.data = actions.payload
            state.detail = firststate
        },
        [get_detail_transfer.fulfilled] : (state,actions)=>{
            state.detail = actions.payload
        },
        [get_detail_transfer.rejected] : (state,actions)=>{
            state.detail = firststate
        },
        [resetinputmodal] : (state,actions)=>{
            state.detail = firststate;
        }



    }
})

const {reducer} = transfer;
export default reducer;