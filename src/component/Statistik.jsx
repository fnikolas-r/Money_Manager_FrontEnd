import React, {useState} from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale
} from 'chart.js';
import {Pie, Line} from 'react-chartjs-2';
import {Disclosure} from "@headlessui/react";
import Navbar from "./MicroComponent/Navbar/Navbar";
import Data_Services from "../services/function.service.js";
import {useSelector} from "react-redux";
import Stats from "./MicroComponent/Stats.jsx";
import dayjs from "dayjs";
import FloatButton from "./MicroComponent/FloatButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Datepicker from "react-tailwindcss-datepicker";

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale,
    LinearScale,
    PointElement,
    LineElement)

function Statistik(props) {
    const [jenis_filter, setJenis_filter] = useState("daily");
    const [limit_date, setLimit_date] = useState('all');
    const transaksi = useSelector(state => state.transaksi)
    const utang_p = useSelector(state => state.utangpiutang)
    const {show_hidden_account} = useSelector(state => state.component)
    const [tanggal, setTanggal] = useState({startDate: new Date(), endDate: new Date()});
    const [tanggal_main, setTanggal_main] = useState({startDate: new Date(), endDate: new Date()});

    const handleValueChange = (newValue) => {setTanggal(newValue);}
    const handleTangalUtama = (newValue) => {setTanggal_main(newValue);}

    var data = transaksi.data.filter(v => show_hidden_account ? true : !(v.rekening_hidden))

    const data_pengeluaran = Data_Services.TRANSAKSI_DATA_FACTORY(data, -1, "Pengeluaran", true, limit_date=="custom" ? tanggal_main : limit_date)
    const data_pendapatan = Data_Services.TRANSAKSI_DATA_FACTORY(data, 1, "Pendapatan", true, limit_date=="custom" ? tanggal_main : limit_date)
    const stats = Data_Services.TRANSAKSI_STATS(data,
        utang_p.data.filter(v => !v.is_done), limit_date=="custom" ? tanggal_main : limit_date
    )

    const stats_2 = Data_Services.TRANSAKSI_STATS(data.filter(v=>(v.is_protected==false && v.id_transfer==null && v.id_utang_piutang==null && !v.rekening_hidden)),[],limit_date=="custom" ? tanggal_main : limit_date)
    const data_harian = Data_Services.TRANSAKSI_DATE_FACTORY(data.sort((a, b) => {
        if (dayjs(a.trc_date).isBefore(dayjs(b.trc_date))) {
            return -1
        }
        if (dayjs(b.trc_date).isBefore(dayjs(a.trc_date))) {
            return 1
        }
        return 0
    }), jenis_filter !="custom" ? jenis_filter : tanggal )
    const generate_option = (title) => {
        return {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    align: "center",
                    padding: {
                        top: 10,
                        bottom: 30,
                    },
                }
            }, maintainAspectRatio: false, responsive:true
        }
    }
    return (<>
        <Navbar/>

        <div className="mx-4 mb-10">
            <div className="p-10 overflow-y-auto">
                <div className="md:flex my-5">
                    <div className="grow md:w-60 ">
                    <select onChange={(e) => {
                        setLimit_date(e.target.value)
                    }}
                    defaultValue={"all"}
                    >
                        <option value={"all"}>Tampilkan Semua</option>
                        <option value={"7-days"}>1 Minggu Yang Lalu</option>
                        <option value={"1-month"}>1 Bulan yang Lalu</option>
                        <option value={"3-months"}>3 Bulan yang Lalu</option>
                        <option value={"1-year"}>1 Tahun yang Lalu</option>
                        <option value={"5-years"}>5 Tahun yang Lalu</option>
                        <option value={"custom"}>Custom</option>
                    </select>
                </div>
                    <div className="grow md:w-30 ">
                                        {limit_date=="custom"?<div className="">
                    <Datepicker value={tanggal_main} onChange={handleTangalUtama}/>
                </div>:<></>}
                    </div>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Total</h3>

                <dl className="mt-5 flex gap-5 snap-x snap-mandatory ">
                    {stats.map((item) => {
                        return <div key={item.name} className="snap-center">
                            <Stats key={item.name} {...item}/>
                        </div>
                    })}
                </dl>
            </div>
            <div className="md:p-10 overflow-y-auto">
                <div className="grid  md:grid-cols-2 ">
                    {/*TODO:Konversi ini ke nivo*/}
                    <div className="h-[80vh] md:h-[50vh]">
                        <Pie data={data_pengeluaran} options={generate_option("Transaksi Pengeluaran")}/>
                    </div>
                    <div className="h-[80vh] md:h-[50vh]">
                        <Pie data={data_pendapatan} options={generate_option("Transaksi Pendapatan")}/>
                    </div>

                </div>
                <div className="grid mt-10">
                    <Disclosure defaultOpen={true}>
                        {({open}) => (
                            <>
                                <Disclosure.Button>
                                    <h5 className="text-lg leading-6 font-medium text-gray-900">Top 10 Kategori
                                        Pengeluaran Transaksi
                                        <FontAwesomeIcon icon="fa-solid fa-chevron-right"
                                                         className={`ml-3 ${open ? 'rotate-90 transform' : ''}`}/>
                                    </h5>
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                    {
                                        Data_Services.TRANSAKSI_SUM(transaksi.data,-1,false,10,limit_date=="custom" ? tanggal_main : limit_date).sort((a, b) => {
                                            if (a.sum < b.sum) {
                                                return 1
                                            } else if (a.sum > b.sum) {
                                                return -1
                                            } else {
                                                return 0
                                            }
                                        }).map(value => {
                                            return <div className="mb-8" key={value.rekening}>
                                                {value.rekening}
                                                <div className="bg-gray-200 relative h-4 w-full rounded-2xl">

                                                    <div
                                                        className={`bg-red-500 absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-white`}
                                                        style={{width: `${Math.round(value.sum / stats_2[2].total * 100)}%`}}
                                                    >
                                                        {Math.round(((value.sum / stats_2[2].total) + Number.EPSILON) * 1000) / 10}%

                                                    </div
                                                    >
                                                </div>
                                            </div>;
                                        })
                                    }
                                </Disclosure.Panel>
                            </>
                        )}

                    </Disclosure>
                </div>
                <div className="md:p-10">
                    <div className=" h-[70vh]">
                        <div className="md:flex">
                            <div className="grow md:w-80">
                                                        Tentukan Periode <br/>
                        <select onChange={val => {
                            setJenis_filter(val.target.value)
                        }}
                            defaultValue={"daily"}

                        >
                            <option value="7days">7 Hari Terakhir</option>
                            <option value="daily" defaultValue={true}>30 Hari Terakhir</option>
                            <option value="weekly">30 Minggu Terakhir</option>
                            <option value="monthly">12 Bulan Terakhir</option>
                            <option value="annual">5 Tahun Terakhir</option>
                            <option value="all">Semuanya</option>
                            <option value={"custom"}>Custom</option>
                        </select>
                            </div>
                            <div className="grow md:w-15 sm:mt-3">
                                {jenis_filter=="custom"?<div className="mt-5">
                                    <Datepicker value={tanggal} onChange={handleValueChange}/>
                                </div>:<></>}
                            </div>
                        </div>
                        <Line data={data_harian} options={generate_option("Transaksi Pengeluaran perTanggal")}/>
                    </div>
                </div>
            </div>

        </div>
        <FloatButton/>
    </>);
}

export default Statistik;