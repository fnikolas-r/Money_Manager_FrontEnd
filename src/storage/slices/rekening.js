import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import DataServices from "../../services/data.service.js";
import {modalbackto, resetinputmodal} from "./component.js";
import {setMessage} from "./messages.js";
import {get_transaksi} from "./transaksi.js";
import {get_transfer} from "./transfer.js";
import {get_utangpiutang} from "./utang_piutang.js";
import {logout} from "./auth.js";
import AuthService from "../../services/auth.service.js";

export const add_rekening = createAsyncThunk("rekening/add", async ({name, is_hidden, initial_deposit}, thunkAPI) => {
        try {
            const data = await DataServices.Rekening.add(name, is_hidden, initial_deposit);
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(modalbackto())
            thunkAPI.dispatch(get_rekening())

            return data;
        } catch (e) {
            const pesan1 = (e.response.data.name ?? "") + (e.response.data.is_hidden ?? "") + (e.response.data.initial_deposit ?? "")
            const message = (e.response && (pesan1 == "" ? null : pesan1)) || e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })

export const edit_rekeneing = createAsyncThunk("rekening/edit", async ({id, name, is_hidden, initial_deposit}, thunkAPI) => {

        try {
            const data = await DataServices.Rekening.put(id, name, is_hidden, initial_deposit);
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_rekening())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(modalbackto())
            return data;
        } catch (e) {
            const pesan1 = (e.response.data.name ?? "") + (e.response.data.is_hidden ?? "") + (e.response.data.initial_deposit ?? "")
            const message = (e.response && (pesan1 == "" ? null : pesan1)) || e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })

export const delete_rekening = createAsyncThunk("rekening/delete", async ({id}, thunkAPI) => {
        try {
            const data = await DataServices.Rekening.delete(id);
            thunkAPI.dispatch(get_summary_rekening())
            thunkAPI.dispatch(get_rekening())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(modalbackto())
            return data
        } catch (e) {
            const message = e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })
export const get_rekening = createAsyncThunk('rekening/get', async (_, thunkAPI) => {
    try {
        const data = await DataServices.Rekening.get();
        return data;
    } catch (e) {
        AuthService.refresh_token().catch(e=>{
            thunkAPI.dispatch(logout())
        })
        const message = e.detail
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const get_detail_rekening = createAsyncThunk('rekening/detail', async ({id}, thunkAPI) => {
    try {
        const data = await DataServices.Rekening.get(id);
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const get_summary_rekening = createAsyncThunk("rekening/summary",async (_,thunkAPI)=>{
    try {
        const data = await DataServices.Rekening.summary();
        return data;
    }catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})

const firststate = {name:"",is_hidden:"",initial_deposit:""}
const initialState = {
    detail:firststate,
    data:[],
    summary:[]
}

const rekening = createSlice({
    name:"rekening",
    initialState,
    reducers:{
        reset_detail_rekening : (state)=>{
            state.detail = firststate
        }
    },
    extraReducers:{
        [get_rekening.fulfilled] : (state,actions) =>{
            state.data = actions.payload
            state.detail = firststate
        },
        [get_summary_rekening.fulfilled]:(state,actions)=>{
            state.summary = actions.payload
        },
        [get_detail_rekening.fulfilled] : (state,actions)=>{
            state.detail = actions.payload
        },
        [get_detail_rekening.rejected] : (state,actions)=>{
            state.detail = firststate
        },
        [resetinputmodal] : (state)=>{
            state.detail = firststate
        },
        [modalbackto]  : (state)=>{
            state.detail = firststate
        },



    }
})

const {reducer,actions} = rekening;
export default reducer;