import axios from 'axios'
import AuthService from "../services/auth.service.js";
import {data} from "autoprefixer";


const {refresh_token} = AuthService;
const API_URL = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: API_URL,
})
const get_local_key = () => {
    return JSON.parse(localStorage.getItem("user-token"));
}

api.interceptors.request.use(config => {
    const token = get_local_key();
    if (token && token.access) {
        config.headers["Authorization"] = `Bearer ${token.access }`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


api.interceptors.response.use(res => {
    return res;
}, async (err) => {
    const originalConfig = err.config
    if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                const token = await refresh_token();

                const rs = token.data.access

                api.defaults.headers.common["Authorization"] = `Bearer ${rs}`;

                return api(originalConfig);

            } catch (_error) {

                if (_error.response && _error.response.data) {
                    return Promise.reject(_error.response.data);
                }

                return Promise.reject(_error);
            }
        }

        if (err.response.status === 403 && err.response.data) {
            return Promise.reject(err.response.data);
        }
    }

    return Promise.reject(err);
})


const Rekening = {
    URL: API_URL + "rekening/",
    get(id = null) {
        var URL = this.URL;
        if (id) {
            URL += id + "/";
        }
        return api.get(URL).then(response => response.data)
    },
    add(name, is_hidden, initial_deposit,icon,trf_minimum) {
        return api.post(this.URL, {name, is_hidden, initial_deposit,icon,trf_minimum}
        ).then(response => response.data)
    },
    put(id, name, is_hidden, initial_deposit,icon,trf_minimum) {
        return api.patch(this.URL + id + "/", {name, is_hidden, initial_deposit,icon,trf_minimum}).then(response => response.data)
    },
    delete(id) {
        return api.delete(this.URL + id + "/").then(response => response.data)
    },
    summary() {
        return api.get(this.URL + "stats_summary/").then(response => response.data)
    },
    setPinned(pk){
        return api.post(this.URL+pk+"/set_pinned/").then(response=>response.data)
    }

}

const Kategori = {
    URL: API_URL + "kategori/",
    get(id = null) {
        var URL = this.URL;
        if (id) {
            URL += id + "/";
        }
        return api.get(URL).then(response => response.data)
    },
    add(name, icon,jenis) {
        return api.post(this.URL, {name, icon,jenis}
        ).then(response => response.data)
    },
    put(id, name, icon,jenis) {
        return api.patch(this.URL + id + "/", {name, icon,jenis},).then(response => response.data)
    },
    delete(id) {
        return api.delete(this.URL + id + "/").then(response => {
            return {status: 200, message: "Berhasil Menghapus Data"}
        })
    },

}

const Transaksi = {
    URL: API_URL + "transaksi/",
    get(id = null) {
        var URL = this.URL;
        if (id) {
            URL += id + "/";
        }
        return api.get(URL).then(response => response.data)
    },
    add(pelaku, trc_name, price, trc_type, trc_date, rekening, kategori) {
        console.log(`trc date ${trc_date}`)
        return api.post(this.URL, {pelaku, trc_name, price, trc_type, trc_date, rekening, kategori}
        ).then(response => response.data)
    },
    put(id, pelaku, trc_name, price, trc_type, trc_date, rekening, kategori) {
        return api.patch(this.URL + id + "/", {
            pelaku,
            trc_name,
            price,
            trc_type,
            trc_date,
            rekening,
            kategori
        }).then(response => response.data)
    },
    delete(id) {
        return api.delete(this.URL + id + "/").then(response => {
            return {status: 200, message: "Berhasil Menghapus Data"}
        })
    },

}

const UtangPiutang = {
    URL: API_URL + "utangpiutang/",
    get(id = null) {
        var URL = this.URL;
        if (id) {
            URL += id + "/";
        }
        return api.get(URL).then(response => response.data)
    },
    add(due_date, person_in_charge, type, tgl_transaksi, nominal, keterangan, rekening) {
        console.log({due_date, person_in_charge, type, tgl_transaksi, nominal, keterangan, rekening})
        return api.post(this.URL, {
                due_date,
                person_in_charge,
                type,
                tgl_transaksi,
                nominal,
                keterangan,
                rekening
            }).then(response => response.data)

    },
    put(id, due_date, person_in_charge, type, tgl_transaksi, nominal, keterangan, rekening) {
        return api.patch(this.URL + id + "/", {
            due_date,
            person_in_charge,
            type,
            tgl_transaksi,
            nominal,
            keterangan,
            rekening
        }).then(response => response.data)
    },
    delete(id) {
        return api.delete(this.URL + id + "/").then(response => {
            return {status: 200, message: "Berhasil Menghapus Data"}
        })
    },
    tandai_lunas(id,tujuan) {
        return api.post(this.URL + id + "/set_done/",
            {tujuan}
            ).then(response => response.data)
    },
    split_bill(due_date,type,tgl_transaksi,keterangan,rekening,split_bills){
        return api.post(this.URL+"split_bill/",{
            due_date,type,tgl_transaksi,keterangan,rekening,split_bills
        }).then(response=>response.data)
    }

}

const Transfer = {
    URL: API_URL + "transfer/",
    get(id = null) {
        var URL = this.URL;
        if (id) {
            URL += id + "/";
        }
        return api.get(URL).then(response => response.data)
    },
    add(keterangan, tgl_transfer, nominal, from_account, to_account) {
        return api.post(this.URL, {keterangan, tgl_transfer, nominal, from_account, to_account}
        ).then(response => response.data)
    },
    put(id, keterangan, tgl_transfer, nominal, from_account, to_account) {
        return api.patch(this.URL + id + "/", {
            keterangan,
            tgl_transfer,
            nominal,
            from_account,
            to_account
        }).then(response => response.data)
    },
    delete(id) {
        return api.delete(this.URL + id + "/").then(response => {
            return {status: 200, message: "Berhasil Menghapus Data"}
        })
    },

}

const User = {
    URL:API_URL+"login/profile/",
    update(first_name,last_name,email,bio){
        return api.patch(this.URL,{first_name,last_name,email,bio}).then(
            response => response.data
        )
    },
    request_profile(){
        return api.get(this.URL).then(response=>{
            if(response.data.username){
                localStorage.setItem("user-data",JSON.stringify(response.data))
                return response.data
            }
        })
    },
    upload_profile_photo(photo) {
        return api.patch(this.URL, photo,
            {"headers":{ "Content-Type": "multipart/form-data" }})
            .then(response => response.data)
    },
    delete_profile_photo(){
        return api.post(this.URL+"delete_photo/").then(response=>response.data)
    },
    link_gogle_account(t){
        return api.post(this.URL+"link/",{t}).then(response=>response.data)
    },
    unlink_google(){
        return api.delete(this.URL).then(response=>response.data).then(response=>response.data)
    },

}

const DataServices = {
    Transaksi,
    Transfer,
    UtangPiutang,
    Kategori,
    Rekening,
    User
}

export default DataServices;