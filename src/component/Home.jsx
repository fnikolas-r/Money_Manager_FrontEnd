import React, {useState} from "react";
import Navbar from "./MicroComponent/Navbar/Navbar.jsx";
import PriceTag from "./MicroComponent/PriceTag";
import FloatButton from "./MicroComponent/FloatButton";
import Dividers from "./MicroComponent/Divider";
import {useDispatch, useSelector} from "react-redux";
import 'dayjs/locale/id';
import dayjs from "dayjs";
import ModalMaster from "./MicroComponent/Modals/ModalMaster";
import TabelTransasksi from "./MicroComponent/Tables/TabelTransasksi";
import TabelTransfer from "./MicroComponent/Tables/TabelTransfer.jsx";
import TabelUtangPiutang from "./MicroComponent/Tables/TabelUtangPiutang.jsx";


dayjs.locale('id')

function Home(props) {

    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(state=>state.auth)
    const rekening = useSelector(state => state.rekening)
    const component = useSelector(state => state.component)
    const kategori = useSelector(state => state.kategori)
    const {summary} = rekening
    const {modalInputOpen,show_hidden_account} = component;

    //TODO:Perbaiki bug nya rekeningn kosong nanti
    return (
        <>

            <Navbar/>
                <div className="mx-4 mb-10">
                    <PriceTag stats={summary.filter(val=>(show_hidden_account? true:(!val.rekening_hidden)))}/>
                    <Dividers name="Daftar Transaksi"/>
                    <div className="mb-10">
                        <TabelTransasksi/>
                    </div>
                    <div className="mb-10">
                        <TabelTransfer/>
                   </div>
                    <div className="mb-32">
                        <TabelUtangPiutang/>
                    </div>
                    <FloatButton/>
                </div>
        </>
    )
}

export default  Home;