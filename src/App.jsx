import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./component/Home.jsx";
import Login from "./component/Login.jsx";
import NotFound from "./component/NotFound";
import LoginRequired from "./component/Auth/LoginRequired";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./component/SignUp.jsx";
import {ToastContainer} from "react-toastify";
import React from "react";
import Statistik from "./component/Statistik";
import ModalMaster from "./component/MicroComponent/Modals/ModalMaster.jsx";
import Profile from "./component/Profile.jsx";


function App() {
    return (
        <>
            <ToastContainer/>
            <ModalMaster/>
        <Router>
            <Routes>
                <Route path="/" element={<LoginRequired><Home/></LoginRequired>}/>
                <Route path="/summary" element={<LoginRequired><Statistik/></LoginRequired>}/>
                <Route path="/profile" element={<LoginRequired><Profile/></LoginRequired>}/>
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
