import React, {PureComponent, useState} from 'react';
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

import Navbar from "./MicroComponent/Navbar/Navbar";
import Data_Services from "../services/function.service.js";
import {useSelector} from "react-redux";
import Stats from "./MicroComponent/Stats.jsx";

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale,
    LinearScale,
    PointElement,
    LineElement)

function Statistik(props) {
    const [jenis_filter, setJenis_filter] = useState("daily");
    const transaksi = useSelector(state => state.transaksi)
    const data_pengeluaran = Data_Services.TRANSAKSI_DATA_FACTORY(transaksi.data, -1, "Pengeluaran", true, 10)
    const data_pendapatan = Data_Services.TRANSAKSI_DATA_FACTORY(transaksi.data, 1, "Pendapatan", true, 10)
    const stats = Data_Services.TRANSAKSI_STATS(transaksi.data)

    const data_harian = Data_Services.TRANSAKSI_DATE_FACTORY(transaksi.data, jenis_filter)
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
            }, maintainAspectRatio: false
        }
    }
    return (<>
        <Navbar/>

        <div className="mx-4 mb-10">
            <div className="p-10 overflow-y-auto">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Total</h3>

                <dl className="mt-5 flex gap-5 snap-x snap-mandatory ">
                    {Data_Services.TRANSAKSI_STATS(transaksi.data.filter(item=>item.kategori !=null || item.id_utang_piutang!=null || item.is_protected)).map((item) => {
                        return <div key={item.name} className="snap-center">
                            <Stats key={item.name} {...item}/>
                        </div>
                    })}
                </dl>
            </div>
            <div className="p-10 overflow-y-auto">
                <div className="grid grid-cols-2 h-[40vh]">
                    {/*TODO:Konversi ini ke nivo*/}
                    <div className="">
                        <Pie data={data_pengeluaran} options={generate_option("Transaksi Pengeluaran")}/>
                    </div>
                    <div className="">
                        <Pie data={data_pendapatan} options={generate_option("Transaksi Pendapatan")}/>
                    </div>

                </div>
                <div className="grid h-[50vh]">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">Top 10 Kategori Pengeluaran Transaksi</h5>
                    {
                        Data_Services.TRANSAKSI_SUM(transaksi.data).map(value => {
                            return <div className="mb-8">
                                {value.rekening}
                                <div className="bg-gray-200 relative h-4 w-full rounded-2xl">

                                    <div
                                        className={`bg-red-500 absolute top-0 left-0 flex h-full w-[${Math.round(value.sum/stats[2].total)}%] items-center justify-center rounded-2xl text-xs font-semibold text-white`}
                                    >
                                        {(value.sum/stats[2].total).toFixed(2)}%
                                    </div>
                                </div>
                            </div>;
                        })
                    }
                </div>
                <div className="p-10">
                    <div className="h-[70vh]">
                        Tentukan Periode <br/>
                        <select onChange={val => {
                            setJenis_filter(val.target.value)
                        }}>
                            <option value="daily" defaultValue={true}>30 Hari Terakhir</option>
                            <option value="weekly">30 Minggu Terakhir</option>
                            <option value="monthly">12 Bulan Terakhir</option>
                            <option value="annual">5 Tahun Terakhir</option>
                        </select>
                        <Line data={data_harian} options={generate_option("Transaksi Pengeluaran perTanggal")}/>
                    </div>
                </div>
            </div>

        </div>

    </>);
}

export default Statistik;