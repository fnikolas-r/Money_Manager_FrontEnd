import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./component/Home.jsx";
import Login from "./component/Login.jsx";
import NotFound from "./component/NotFound";
import LoginRequired from "./component/Auth/LoginRequired";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {get_rekening, get_summary_rekening} from "./storage/slices/rekening.js";
import {get_transaksi} from "./storage/slices/transaksi.js";
import {get_kategori} from "./storage/slices/kategori.js";
import {get_transfer} from "./storage/slices/transfer.js";
import {get_utangpiutang} from "./storage/slices/utang_piutang.js";
import SignUp from "./component/SignUp.jsx";
import {ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import ComingSoon from "./component/Soon";
import Statistik from "./component/Statistik";
import ModalMaster from "./component/MicroComponent/Modals/ModalMaster.jsx";


function App() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (isLoggedIn) {

            dispatch(get_rekening())
            dispatch(get_transaksi())
            dispatch(get_kategori())
            dispatch(get_utangpiutang())
            dispatch(get_summary_rekening())
            dispatch(get_transfer())
        }
    },[isLoggedIn])
    return (
        <>
            <ToastContainer/>
            <ModalMaster/>
        <Router>
            <Routes>
                <Route path="/" element={<LoginRequired><Home/></LoginRequired>}/>
                <Route path="/summary" element={<LoginRequired><Statistik/></LoginRequired>}/>

                <Route path="logout" element={<Login logout={true}/>}/>
                <Route path="auth/login" element={<Login/>}/>
                <Route path="auth/register" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
            </>
    )
}

export default App
