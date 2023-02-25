import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import DataServices from "../../services/data.service.js";
import {get_rekening, get_summary_rekening} from './rekening.js';
import {setMessage} from "./messages.js";
import {logout} from "./auth.js";
import { resetinputmodal} from "./component.js";

const call_back = (e,thunkAPI)=>{
    const pesan1 = (e.response.data.pelaku ?? "") + (e.response.data.trc_name ?? "") + (e.response.data.price ?? "") +
                (e.response.data.trc_type ?? "") + (e.response.data.trc_date ?? "") + (e.response.data.rekening ?? "") +
                (e.response.data.kategori ?? "")

    const message = (e.response && (pesan1 == "" ? null : pesan1)) || e.response.data.detail || e.toString();
    thunkAPI.dispatch(setMessage({status: 400, message: message}));
    return thunkAPI.rejectWithValue("Terjadi Kesalahan");
}

export const add_transaksi = createAsyncThunk("transaksi/add", async ({pelaku,trc_name,price,trc_type,trc_date,rekening,kategori}, thunkAPI) => {
        try {
            const data = await DataServices.Transaksi.add(pelaku,trc_name,price,trc_type,trc_date,rekening,kategori);
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_transaksi())
                        thunkAPI.dispatch(resetinputmodal())
            return data;

        } catch (e) {
            return call_back(e,thunkAPI)
        }
    })
export const edit_transaksi = createAsyncThunk("transaksi/edit", async ({id,pelaku,trc_name,price,trc_type,trc_date,rekening,kategori}, thunkAPI) => {

        try {
            const data = await DataServices.Transaksi.put(id,pelaku,trc_name,price,trc_type,trc_date,rekening,kategori);
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(resetinputmodal())
            return data;
        } catch (e) {
            call_back(e,thunkAPI)
        }
    })
export const delete_transaksi = createAsyncThunk("transaksi/delete", async ({id}, thunkAPI) => {
        try {
            const data = await DataServices.Transaksi.delete(id);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
                        thunkAPI.dispatch(resetinputmodal())

            return data
        } catch (e) {
            const message = e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })
export const get_transaksi = createAsyncThunk('transaksi/get', async (_, thunkAPI) => {
    try {
        const data = await DataServices.Transaksi.get();
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const get_detail_transaksi = createAsyncThunk('transaksi/detail', async ({id}, thunkAPI) => {
    try {
        const data = await DataServices.Transaksi.get(id);
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})

const initialState = {
    detail:null,
    data:[]
}
const first_state = {pelaku:"",trc_name:"",price:"",trc_type:"",trc_date:"",rekening_id:"",kategori_id:""}
const transaksi = createSlice({
    name:"transaksi",
    initialState,
    extraReducers:{
        [get_transaksi.fulfilled] : (state,actions) =>{
            state.data = actions.payload
            state.detail = first_state
        },
        [get_transaksi.pending] : (state)=>{
          state.data = []
        },
        [get_detail_transaksi.fulfilled] : (state,actions)=>{
            state.detail = actions.payload
        },
        [get_detail_transaksi.rejected] : (state,actions)=>{
            state.detail = first_state
        }



    }
})

const {reducer} = transaksi;
export default reducer;