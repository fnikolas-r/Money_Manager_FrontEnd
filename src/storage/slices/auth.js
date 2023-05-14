import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "./messages.js";
import {get_rekening, get_summary_rekening} from "./rekening.js";
import {get_transaksi} from "./transaksi.js";
import {get_kategori} from "./kategori.js";
import {get_transfer} from "./transfer.js";
import {get_utangpiutang} from "./utang_piutang.js";


import AuthService from "../../services/auth.service.js";
import DataService from "../../services/data.service.js";
import {resetinputmodal} from "./component.js";
import axios from "axios";


export const register = createAsyncThunk(
    "auth/register",
    async ({username, email, password, password2, first_name, last_name}, thunkAPI) => {
        try {
            const response = await AuthService.sign_up(username, first_name, last_name, password, email, password2)
            await thunkAPI.dispatch(login({username, password}))
            return response.data
        } catch (e) {
            console.log(e)
            const pesan1 = (e.response.data.username ?? "") + (e.response.data.email ?? "")

            const message = (e.response && pesan1) || e.toString()

            thunkAPI.dispatch(setMessage({status: 400, message: message}))
            return thunkAPI.rejectWithValue()
        }
    })

export const bootstrap = createAsyncThunk(
    "auth/loading",
    async (_, thunkAPI) => {
        try {
            await thunkAPI.dispatch(get_rekening())
            await thunkAPI.dispatch(get_rekening())
            await thunkAPI.dispatch(get_transaksi())
            await thunkAPI.dispatch(get_kategori())
            await thunkAPI.dispatch(get_utangpiutang())
            await thunkAPI.dispatch(get_summary_rekening())
            await thunkAPI.dispatch(get_transfer())
            await thunkAPI.dispatch(get_profile())
            return true;
        } catch (e) {
            thunkAPI.dispatch(setMessage({status: 400, message: "Terjadi Kesalahan "}));
        }
        return false;
    }
)
export const login = createAsyncThunk(
    "auth/login",
    async ({username, password, remember_me}, thunkAPI) => {
        try {
            const user_token = await AuthService.login(username, password);
            const user_data = await DataService.User.request_profile();
            await thunkAPI.dispatch(setMessage({message: "Berhasil Login", status: 200}))
            return {user: user_data, token: user_token};
        } catch (e) {
            const pesan1 = (e.response.data.username ?? "") + (e.response.data.password ?? "")
            const message = (e.response && (pesan1 == "" ? null : pesan1)) || e.response.data.detail || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
);

export const login_by_google = createAsyncThunk(
    'auth/google',
    async ({t}, thunkAPI) => {
        try {
            const user_token = await AuthService.login_by_google(t);
            console.log(user_token)
            const user_data = await DataService.User.request_profile();
            await thunkAPI.dispatch(setMessage({message: "Berhasil Login", status: 200}))
            return {user: user_data, token: user_token}

        } catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
)
export const get_profile = createAsyncThunk(
    "auth/profile",
    async ()=>{
        try {
            const user_data = await DataService.User.request_profile();
            return user_data;
        }catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }

)

export const update_profile = createAsyncThunk(
    "auth/profile/update",
    async ({first_name,last_name,bio,email},thunkAPI)=>{
        try {
            const user_data = await DataService.User.update(first_name,last_name,email,bio);
            await thunkAPI.dispatch(resetinputmodal())
            await thunkAPI.dispatch(get_profile())
            return user_data
        }catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
)

export const update_profile_photo = createAsyncThunk(
    "auth/profile/photo/update",
    async ({file},thunkAPI)=>{
        try {
            const formData = new FormData();
            formData.append("photo",file)
            const user_data = await DataService.User.upload_profile_photo(formData)
            await thunkAPI.dispatch(resetinputmodal())
            await thunkAPI.dispatch(get_profile())
            return user_data
        }catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
)

export const delete_profile_photo = createAsyncThunk(
    "auth/profile/photo/delete",
    async (_,thunkAPI)=>{
        try {
            const result = DataService.User.delete_profile_photo()
            thunkAPI.dispatch(get_profile())
            return result
        }catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
)
export const link_google = createAsyncThunk(
    "auth/profile/google/link",
    async ({t},thunkAPI)=>{
        try {
            const user = await DataService.User.link_gogle_account(t)
            await thunkAPI.dispatch(setMessage({message: "Berhasil Meyambungkan Google", status: 200}))
            await thunkAPI.dispatch(get_profile())
            return user
        }catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
)
export const unlink_google = createAsyncThunk(
    "auth/profile/google/unlink",
    async (_,thunkAPI)=>{
        try {
            const data = await DataService.User.unlink_google();
            await thunkAPI.dispatch(get_profile())
            await thunkAPI.dispatch(setMessage({message: "Berhasil Menghapus Link Google", status: 400}))
            return data
        }catch (e) {
            const message = e.response.data.message || e.toString();
            thunkAPI.dispatch(setMessage({status: 400, message: message}));
            return thunkAPI.rejectWithValue("Terjadi Kesalahan");
        }
    }
)
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await AuthService.logout()
    }
)


const user_token = JSON.parse(localStorage.getItem('user-token'))
const user_data = JSON.parse(localStorage.getItem("user-data"))
const initialState = (user_token && user_data)
    ? {isLoggedIn: true, user: user_data, token: user_token, isLoading: true}
    : {isLoggedIn: false, user: null, token: null, isLoading: true};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [bootstrap.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [get_profile.fulfilled]:(state,action)=>{
            state.user = action.payload
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user
        },
        [login.pending]: (state, action) => {
            state.isLoading = true;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.isLoading = true;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = true;
        },
        [login_by_google.fulfilled]:(state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user
        },
        [login_by_google.pending]: (state, action) => {
            state.isLoading = true;
        },
        [login_by_google.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.isLoading = true;
        },
        [get_profile.fulfilled]:(state,action)=>{
            state.user = action.payload;
        }
    },
})

const {reducer} = authSlice;
export default reducer;