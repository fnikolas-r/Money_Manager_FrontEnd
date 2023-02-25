import CardItem from "../CardItem.jsx";
import DefaultModal from "../DefaultModal.jsx";
import React from "react";
import {useEffect,useState} from "react";
import ListView from "../ListView";
import FormInput from "../FormInput";
import RekeningInput from "../forms_view/Input/RekeningInput";
import TransaksiInput from "../forms_view/Input/TransaksiInput";
import KategoriInput from "../forms_view/Input/KategoriInput";
import UtangPiutangInput from "../forms_view/Input/UtangPiutangInput";
import {useSelector} from "react-redux";

const rekening_data = (data)=>{
    return <CardItem key={data.id} {...data} id={data.id} name="rekening" before="list_rekening"/>
}




export default function ListRekening(props){

    const {summary} = useSelector(state => state.rekening)

    const refresh_rekening = (data)=>{
        return data.map(item=>{return {
        id:item.rekening,
        title:item.name,
        summary:[`Total : ${item.total}`,`Latest Transaction : ${item.latest_trc}`]
    }})
    }


    return <ListView item={summary} function={rekening_data} mapping={refresh_rekening} name="rekening" before="list_rekening"/>
}