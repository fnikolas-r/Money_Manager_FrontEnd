import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/messages";
import rekeningReducer from "./slices/rekening.js";
import transferReducer from "./slices/transfer.js";
import transaksiReducer from "./slices/transaksi.js";
import kategoriReducer from "./slices/kategori.js";
import utangpiutangReducer from "./slices/utang_piutang.js";
import componentReducer from "./slices/component.js";


export default configureStore({
    reducer:{
        message:messageReducer,
        component:componentReducer,
        auth:authReducer,
        rekening:rekeningReducer,
        transaksi:transaksiReducer,
        transfer:transferReducer,
        kategori:kategoriReducer,
        utangpiutang:utangpiutangReducer,
    },
    devTools : import.meta.env.MODE!=="production"
})
