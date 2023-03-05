import React,{useEffect} from "react";
import Navbar from "./MicroComponent/Navbar/Navbar.jsx";
import PriceTag from "./MicroComponent/PriceTag";
import FloatButton from "./MicroComponent/FloatButton";
import Dividers from "./MicroComponent/Divider";
import {useSelector,useDispatch} from "react-redux";
import 'dayjs/locale/id';
import dayjs from "dayjs";
import ModalMaster from "./MicroComponent/Modals/ModalMaster";
import TabelTransasksi from "./MicroComponent/Tables/TabelTransasksi";
import TabelTransfer from "./MicroComponent/Tables/TabelTransfer.jsx";
import TabelUtangPiutang from "./MicroComponent/Tables/TabelUtangPiutang.jsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {setinputmodalstatus} from "../storage/slices/component.js";
import {get_rekening} from "../storage/slices/rekening.js";
import {get_kategori} from "../storage/slices/kategori.js";


dayjs.locale('id')

function Home(props) {

    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(state=>state.auth)
    const rekening = useSelector(state => state.rekening)
    const component = useSelector(state => state.component)
    const kategori = useSelector(state => state.kategori)
    const {summary} = rekening
    const {modalInputOpen} = component;

    const MySwal = withReactContent(Swal)
    const check_fist = ()=>{
        if(rekening.data.length<1 && !modalInputOpen.status){

            MySwal.fire({
              title: "Rekening anda belum ada, silahkan isi rekening terlebih dahulu",
              icon: 'error',
            }).then(()=>{
                dispatch(setinputmodalstatus({name:"add_rekening",id:null,before:null}))
            })
        }
        else if(kategori.data.length<1 && !modalInputOpen.status){

            MySwal.fire({
              title: "Kategori anda belum ada, silahkan isi Kategori terlebih dahulu",
              icon: 'error',
            }).then(()=>{
                dispatch(setinputmodalstatus({name:"add_kategori",id:null,before:null}))
            })
        }

    }

    useEffect(() => {
        check_fist()
    }, [get_rekening,get_kategori,modalInputOpen.status]);

    //TODO:Perbaiki bug nya rekeningn kosong nanti
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