import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import DataServices from "../../services/data.service.js";
import {setMessage} from "./messages.js";
import {modalbackto} from "./component.js";
import {get_transaksi} from "./transaksi.js";
import {get_transfer} from "./transfer.js";
import {get_utangpiutang} from "./utang_piutang.js";

const call_back = (e,thunkAPI)=>{
    const pesan1 = (e.response.data.name ?? "") + (e.response.data.icon ?? "")

    const message = (e.response && (pesan1 == "" ? null : pesan1)) || e.response.data.detail || e.toString();
    thunkAPI.dispatch(setMessage({status: 400, message: message}));
    return thunkAPI.rejectWithValue("Terjadi Kesalahan");
}

export const add_kategori = createAsyncThunk("kategori/add", async ({name,icon,jenis}, thunkAPI) => {
        try {
            const data = await DataServices.Kategori.add(name,icon,jenis);
            thunkAPI.dispatch(get_kategori())
            thunkAPI.dispatch(modalbackto())
            return data;

        } catch (e) {
            return call_back(e,thunkAPI)
        }
    })
export const edit_kategori = createAsyncThunk("kategori/edit", async ({id,name,icon,jenis}, thunkAPI) => {

        try {
            const data = await DataServices.Kategori.put(id,name,icon);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_kategori())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(modalbackto())
            return data;

        } catch (e) {
            call_back(e,thunkAPI)
        }
    })
export const delete_kategori = createAsyncThunk("kategori/delete", async ({id}, thunkAPI) => {
        try {
            const data = await DataServices.Kategori.delete(id);
            thunkAPI.dispatch(get_transaksi())
            thunkAPI.dispatch(get_transfer())
            thunkAPI.dispatch(get_utangpiutang())
            thunkAPI.dispatch(get_kategori())
            thunkAPI.dispatch(modalbackto())
            return data
        } catch (e) {
            const message = e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    })
export const get_kategori = createAsyncThunk('kategori/get', async (_, thunkAPI) => {
    try {
        const data = await DataServices.Kategori.get();
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})
export const get_detail_kategori = createAsyncThunk('kategori/detail', async ({id}, thunkAPI) => {
    try {
        const data = await DataServices.Kategori.get(id);
        return data;
    } catch (e) {
        const message = e.response.data.detail || e.toString();
        thunkAPI.dispatch(setMessage({status: 400, message: message}));
        return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
})

const firststate = {name:"",is_hidden:"",initial_deposit:""}
const initialState = {
    detail:firststate,
    data:[]
}

const kategori = createSlice({
    name:"kategori",
    initialState,
    reducers:{
      change_icon : (state,action)=>{
          state.detail.icon = action.payload
      }
    },
    extraReducers:{
        [get_kategori.fulfilled] : (state,actions) =>{
            state.data = actions.payload
            state.detail = firststate
        },
        [get_detail_kategori.fulfilled] : (state,actions)=>{
            state.detail = actions.payload
        },
        [get_detail_kategori.rejected] : (state,actions)=>{
            state.detail = firststate
        },
        [modalbackto]  : (state)=>{
            state.detail = firststate
        },



    }
})

const {reducer,actions} = kategori;
export const { change_icon } = actions
export default reducer;