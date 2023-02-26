import React from "react";
import Navbar from "./MicroComponent/Navbar/Navbar.jsx";
import PriceTag from "./MicroComponent/PriceTag";
import FloatButton from "./MicroComponent/FloatButton";
import Dividers from "./MicroComponent/Divider";
import {useSelector} from "react-redux";
import 'dayjs/locale/id';
import dayjs from "dayjs";
import ModalMaster from "./MicroComponent/Modals/ModalMaster";
import TabelTransasksi from "./MicroComponent/Tables/TabelTransasksi";
import TabelTransfer from "./MicroComponent/Tables/TabelTransfer.jsx";
import TabelUtangPiutang from "./MicroComponent/Tables/TabelUtangPiutang.jsx";



dayjs.locale('id')

function Home(props) {

    const {isLoggedIn} = useSelector(state=>state.auth)
    const rekening = useSelector(state => state.rekening)
    const {summary} = rekening
    return (
        <>

            <Navbar/>
                <div className="mx-4 mb-10">
                    <PriceTag stats={summary}/>
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
                    <ModalMaster/>
                </div>
        {/*    TODO: Last Before add



            Minor patch
            1. Tambahkan simple graphic
            1. Remember me button at login component
        */}
        </>
    )
}

export default  Home;