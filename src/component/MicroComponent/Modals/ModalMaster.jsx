import FormInput from "./FormInput.jsx";
import UtangPiutangInput from "./forms_view/Input/UtangPiutangInput.jsx";
import DefaultModal from "./DefaultModal.jsx";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import TransaksiInput from "./forms_view/Input/TransaksiInput";
import RekeningInput from "./forms_view/Input/RekeningInput";
import KategoriInput from "./forms_view/Input/KategoriInput";
import ListRekening from "./modals_view/ListRekening";
import DeleteModals from "./forms_view/DeleteModals";
import {delete_rekening} from "../../../storage/slices/rekening.js";
import ListKategori from "./modals_view/ListKategori";
import {delete_kategori} from "../../../storage/slices/kategori.js";
import {delete_transaksi} from "../../../storage/slices/transaksi.js";
import Transfer, {delete_transfer} from "../../../storage/slices/transfer";
import TransferInput from "./forms_view/Input/TransferInput";
import {delete_utangpiutang} from "../../../storage/slices/utang_piutang.js";
import SetDoneModals from "./forms_view/SetDoneModals";

function render_name(name) {
    switch (name) {
        case "input_transaksi":
            return <FormInput><TransaksiInput/></FormInput>
            break;

        //TODO:Ganti Rekening pelunasan rekening (Buat modal bagian ini)

        case "input_rekening":
            return <FormInput><RekeningInput/></FormInput>
            break;

            case "input_utang_piutang":
            return <FormInput><UtangPiutangInput/></FormInput>
            break;
         case "add_rekening":
            return <FormInput><RekeningInput/></FormInput>
            break;
         //   TODO:Jadiin satu antara input dan add
         case "add_kategori":
            return <FormInput><KategoriInput/></FormInput>
            break;

        case "input_kategori":
            return <FormInput><KategoriInput/></FormInput>
            break;
            case "input_transfer":
            return <FormInput><TransferInput/></FormInput>
            break;

        case "input_utangpiutang":
            return <FormInput><UtangPiutangInput/></FormInput>
            break;

        case "list_rekening":
            return <ListRekening/>
            break;
         case "list_kategori":
            return <ListKategori/>
            break;
        case "delete_rekening":
            return <FormInput><DeleteModals dispatcher={delete_rekening}/></FormInput>
            break;
        case "set_done_utangpiutang":
            return <FormInput><SetDoneModals/></FormInput>;
        break;
        case "delete_kategori":
            return <FormInput><DeleteModals dispatcher={delete_kategori}/></FormInput>
            break;

            case "delete_transaksi":
            return <FormInput><DeleteModals dispatcher={delete_transaksi}/></FormInput>
            break;
            case "delete_transfer":
            return <FormInput><DeleteModals dispatcher={delete_transfer}/></FormInput>
            break;
            case "delete_utangpiutang":
            return <FormInput><DeleteModals dispatcher={delete_utangpiutang}/></FormInput>
            break;
    }
}


export default function ModalMaster(props) {
    const dispatch = useDispatch();
    const {modalInputOpen} = useSelector(state => state.component)
    const {name} = modalInputOpen;

    return <DefaultModal action={name? name.includes("input") : false}>
            {render_name(name)}
    </DefaultModal>
}