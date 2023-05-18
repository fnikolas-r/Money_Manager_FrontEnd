import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import DataServices from "../../services/data.service.js";
import {modalbackto, resetinputmodal,setinputmodalstatus} from "./component.js";
import {setMessage} from "./messages.js";
import {get_transaksi} from "./transaksi.js";
import {get_transfer} from "./transfer.js";
import {get_utangpiutang} from "./utang_piutang.js";
import {logout} from "./auth.js";
import AuthService from "../../services/auth.service.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const add_rekening = createAsyncThunk("rekening/add", async ({name, is_hidden, initial_deposit,icon}, thunkAPI) => {
        try {
            const data = await DataServices.Rekening.add(name, is_hidden, initial_deposit,icon);
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

export const edit_rekeneing = createAsyncThunk("rekening/edit", async ({id,icon, name, is_hidden, initial_deposit}, thunkAPI) => {

        try {
            const data = await DataServices.Rekening.put(id, name, is_hidden, initial_deposit,icon);
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
        const MySwal = withReactContent(Swal)
        if(data.length<1){

            MySwal.fire({
              title: "Rekening anda belum ada, silahkan isi rekening terlebih dahulu",
              icon: 'error',
            }).then(()=>{
                thunkAPI.dispatch(setinputmodalstatus({name:"add_rekening",id:null,before:null}))
            })
        }
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

export const set_rekening_pinned = createAsyncThunk("rekening/set_pinned",async ({pk},thunkAPI)=>{
    try {
        const response = await DataServices.Rekening.setPinned(pk);
        thunkAPI.dispatch(get_summary_rekening())
        return response;
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
    summary:[],
    isLoading:{
        rekening:false,
        summary:false,
    }
}

const rekening = createSlice({
    name:"rekening",
    initialState,
    reducers:{
        reset_detail_rekening : (state)=>{
            state.detail = firststate
        },
        change_icon : (state,action)=>{
          state.detail.icon = action.payload
      }
    },
    extraReducers:{
        [get_rekening.fulfilled] : (state,actions) =>{
            state.data = actions.payload
            state.detail = firststate
            state.isLoading.rekening = false
        },
        [get_summary_rekening.fulfilled]:(state,actions)=>{
            state.summary = actions.payload
            state.isLoading.summary = false
        },
        [get_summary_rekening.pending]:(state)=>{
            state.isLoading.summary = true
        },
        [get_detail_rekening.fulfilled] : (state,actions)=>{
            state.detail = actions.payload
        },
        [get_detail_rekening.rejected] : (state,actions)=>{
            state.detail = firststate
        },
        [get_rekening.pending]:(state)=>{
            state.isLoading.rekening = true
        },
        [set_rekening_pinned.pending]:(state,actions)=>{
            state.isLoading.summary = actions.meta.arg.pk
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
export const { change_icon } = actions
export default reducer;