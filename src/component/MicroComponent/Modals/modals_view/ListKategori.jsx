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



const NAME = "kategori"
const BEFORE = "list_kategori"
const kategori_data = (data)=>{
    return <CardItem key={data.id} {...data} id={data.id} name={NAME} before={BEFORE}/>
}




export default function ListKategori(props){

    const {data} = useSelector(state => state.kategori)

    const refresh_kategori = (data)=>{
        return data.map(item=>{return {
        id:item.id,
        title:item.name,
        summary:[`Type :${item.jenis==1? "Income Category" : item.jenis==-1? "Expense Category" : "All"}`],
            icon:item.icon ?? "fa-money-bill"
    }})
    }


    return <ListView item={data} function={kategori_data} mapping={refresh_kategori} name={NAME} before={BEFORE}/>
}