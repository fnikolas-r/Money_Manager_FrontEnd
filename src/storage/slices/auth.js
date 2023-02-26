import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "./messages.js";
import {get_rekening,get_summary_rekening} from "./rekening.js";
import {get_transaksi} from "./transaksi.js";
import {get_kategori} from "./kategori.js";
import {get_transfer} from "./transfer.js";
import {get_utangpiutang} from "./utang_piutang.js";


import AuthService from "../../services/auth.service.js";



export const register = createAsyncThunk(
    "auth/register",
    async ({username,email,password,password2,first_name,last_name},thunkAPI)=>{
        try {
            const response = await AuthService.sign_up(username,first_name,last_name,password,email,password2)
            await thunkAPI.dispatch(login({username,password}))
            return response.data
        }catch (e) {
            console.log(e)
            const pesan1 = (e.response.data.username ?? "" )+ (e.response.data.email ?? "" )

            const message = (e.response && pesan1 ) || e.toString()

            thunkAPI.dispatch(setMessage({status:400,message:message}))
            return thunkAPI.rejectWithValue()
        }
    })

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password ,remember_me}, thunkAPI) => {
    try {
      const user_token = await AuthService.login(username, password);
      const user_data = await AuthService.request_profile();
      await thunkAPI.dispatch(get_rekening())
      await thunkAPI.dispatch(get_transaksi())
      await thunkAPI.dispatch(get_kategori())
      await thunkAPI.dispatch(get_utangpiutang())
      await thunkAPI.dispatch(get_summary_rekening())
      await thunkAPI.dispatch(get_transfer())
        await thunkAPI.dispatch(setMessage({message:"Berhasil Login",status:200}))
      return {user:user_data, token:user_token};
    } catch (e) {
        const pesan1 = (e.response.data.username ?? "")+ (e.response.data.password ?? "" )
      const message = (e.response && (pesan1==""?null:pesan1) ) || e.response.data.detail || e.toString();
      thunkAPI.dispatch(setMessage({status:400,message:message}));
      return thunkAPI.rejectWithValue("Terjadi Kesalahan");
    }
  }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async ()=>{
        await AuthService.logout()
    }
)


const user_token = JSON.parse(localStorage.getItem('user-token'))
const user_data = JSON.parse(localStorage.getItem("user-data"))
const initialState = (user_token && user_data)
  ? { isLoggedIn: true, user:user_data, token: user_token }
  : { isLoggedIn: false,user:null,token: null };

const authSlice = createSlice({
    name:"auth",
    initialState,
  extraReducers: {
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
})

const { reducer } = authSlice;
export default reducer;