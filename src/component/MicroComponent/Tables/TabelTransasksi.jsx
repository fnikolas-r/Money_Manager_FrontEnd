import React, {useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {setinputmodalstatus} from "../../../storage/slices/component.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function TabelTransaksi() {
    const dispatch = useDispatch()
    const transaksi = useSelector(state => state.transaksi)
    const data_transaksi = transaksi.data
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'trc_name', //access nested data with dot notation
                header: 'Nama Transaksi',
            },
            {
                accessorKey: 'trc_type',
                header: 'Jenis Transaksi',
                Cell: ({cell}) => {
                    var text = "Pengeluaran"
                    var color = "text-red-500"
                    if (cell.getValue() == 1) {
                        text = "Pendapatan"
                        color = "text-green-500"
                    }
                    return <span className={color}>{text}</span>
                },

            },
            {
                accessorKey: 'price', //normal accessorKey
                header: 'Harga',
                Cell: ({cell}) => {
                    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(cell.getValue())
                }
            },
            {
                accessorKey: 'trc_date',
                header: 'Tanggal Transaksi',
                Cell: ({cell}) => {
                    return dayjs(cell.getValue()).format('YYYY-MM-DD (hh:mm),dddd')
                },
                Filter :({header}) =>(
                    <input
                        type={"date"}
                        className={"border border-1 rounded-xl h-10"}
                        defaultValue={header.column.getFilterValue() ?? ""}
                        onChange={(e) => {
                            header.column.setFilterValue(e.target.value || "")
                        }}
                        />
                    ),

                filterFn : (row,_columnIds,filterValue)=>{
                    if(filterValue==""){ return true}
                    return dayjs(row.getValue('trc_date')).isSame(dayjs(filterValue),'day')
                }

            },
            {
                accessorKey: 'rekening',
                header: 'Rekening'
            },
            {
                accessorKey: 'kategori',
                header: 'Kategori',
                Cell: ({cell}) => {
                    if (cell.getValue()) {
                        return cell.getValue()
                    } else {
                        return "-"
                    }
                }
            },
            {
                accessorFn: (row) => {
                    var hasil = "transaksi_" + row.id
                    if (row.id_transfer) {
                        hasil = 'transfer_' + row.id_transfer
                    } else if (row.id_utang_piutang) {
                        hasil = 'utangpiutang_' + row.id_utang_piutang
                    }

                    if (row.is_protected) {
                        hasil = "protected"
                    }
                    return hasil;
                },
                id: 'id',
                header: 'Action',
                size: 50,
                enableSorting: false,
                Cell: ({cell}) => {
                    const val = cell.getValue()
                    if (val == "protected") {
                        return <div className="text-red-600">Is Protected</div>
                    } else {
                        var type = val.split("_")
                        return <div>
                            <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => {
                                dispatch(setinputmodalstatus({name: `input_${type[0]}`, id: type[1]}))
                            }}>Edit <FontAwesomeIcon icon="fa-solid fa-pen-to-square"/></button>
                            <button className="text-red-600 hover:text-red-900 mr-2" onClick={() => {
                                dispatch(setinputmodalstatus({name: `delete_${type[0]}`, id: type[1]}))
                            }}>Delete <FontAwesomeIcon icon="fa-solid fa-trash"/></button>
                        </div>
                    }
                }
            }
        ],
        [],
    );

    return <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Tabel Transaksi</h1>
        <MaterialReactTable columns={columns} data={data_transaksi}
                            initialState={{pagination: {pageIndex: 0, pageSize: 5},}}/>
    </div>


};

export default TabelTransaksi;
