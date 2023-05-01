import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import DataServices from "../../services/data.service.js";
import {get_rekening, get_summary_rekening} from './rekening.js';
import {setMessage} from "./messages.js";
import {get_transfer} from "./transfer.js";
import {get_transaksi} from "./transaksi.js";
import {resetinputmodal} from "./component.js";

const call_back = (e,thunkAPI)=>{
    console.log(e);
    const pesan1 = (e.response.data.due_date ?? "") + (e.response.data.person_in_charge ?? "") +
        (e.response.data.type ?? "") + (e.response.data.tgl_transaksi ?? "") + (e.response.data.nominal ?? "")+
        (e.response.data.is_done ?? "") + (e.response.data.keterangan ?? "") + (e.response.data.rekening ?? "")

    const message = e.response.data.detail || e.toString();
    thunkAPI.dispatch(setMessage({status: 400, message: message}));
    return thunkAPI.rejectWithValue("Terjadi Kesalahan");
}

export const add_utangpiutang = createAsyncThunk("utangpiutang/add", async ({due_date,person_in_charge,type,tgl_transaksi,nominal,keterangan,rekening}, thunkAPI) => {
        try {
            const data = await DataServices.UtangPiutang.add(due_date,person_in_charge,type,tgl_transaksi,nominal,keterangan,rekening);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(resetinputmodal())
            return data;

        } catch (e) {
            return call_back(e,thunkAPI)
        }
    })
export const edit_utangpiutang = createAsyncThunk("utangpiutang/edit", async ({id,due_date,person_in_charge,type,tgl_transaksi,nominal,is_done,keterangan,rekening}, thunkAPI) => {

        try {
            const data = await DataServices.UtangPiutang.put(id,due_date,person_in_charge,type,tgl_transaksi,nominal,keterangan,rekening);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(resetinputmodal())
            return data;
        } catch (e) {
            call_back(e,thunkAPI)
        }
    })
export const delete_utangpiutang = createAsyncThunk("utangpiutang/delete", async ({id}, thunkAPI) => {
        try {
            const data = await DataServices.UtangPiutang.delete(id);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(resetinputmodal())
            return data
        } catch (e) {
            const message = e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })
export const get_utangpiutang = createAsyncThunk('utangpiutang/get', async (_, thunkAPI) => {
    try {
        const data = await DataServices.UtangPiutang.get();
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const get_detail_utangpiutang = createAsyncThunk('utangpiutang/detail', async ({id}, thunkAPI) => {
    try {
        const data = await DataServices.UtangPiutang.get(id);
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const set_lunas_utangpiutang = createAsyncThunk('utangpiutang/set_lunas', async ({id,tujuan}, thunkAPI) => {
    try {
        const data = await DataServices.UtangPiutang.tandai_lunas(id,tujuan)
        thunkAPI.dispatch(resetinputmodal())
        thunkAPI.dispatch(get_rekening())
        thunkAPI.dispatch(get_summary_rekening())
        thunkAPI.dispatch(get_utangpiutang())
        thunkAPI.dispatch(get_transaksi())

        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})

export const split_bills = createAsyncThunk("utangpiutang/add", async ({due_date,type,tgl_transaksi,keterangan,rekening,split_bills}, thunkAPI) => {
        try {
            const data = await DataServices.UtangPiutang.split_bill(due_date,type,tgl_transaksi,keterangan,rekening,split_bills);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(resetinputmodal())
            return data;

        } catch (e) {
            return call_back(e,thunkAPI)
        }
    })
const initialState = {
    detail:null,
    data:[]
}
const firststate = {
    "due_date": null,
    "person_in_charge": "",
    "type": null,
    "tgl_transaksi": null,
    "nominal": null,
    "keterangan": "",
    "rekening": null
}

const utangpiutang = createSlice({
    name:"utangpiutang",
    initialState,
    extraReducers:{
        [get_utangpiutang.fulfilled] : (state,actions) =>{
            state.data = actions.payload
            state.detail = firststate
        },
        [get_detail_utangpiutang.fulfilled] : (state,actions)=>{
            state.detail = actions.payload
        },
        [get_detail_utangpiutang.rejected] : (state,actions)=>{
            state.detail = firststate
        },
        [set_lunas_utangpiutang.rejected] : (state,actions)=>{
            state.detail = firststate
        }



    }
})

const {reducer} = utangpiutang;
export default reducer;