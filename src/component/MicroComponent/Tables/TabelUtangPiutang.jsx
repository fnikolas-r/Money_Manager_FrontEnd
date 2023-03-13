import React, {useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {setinputmodalstatus} from "../../../storage/slices/component.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  MenuItem,
} from '@mui/material';
import {set_lunas_utangpiutang} from "../../../storage/slices/utang_piutang.js";
function TabelUtangPiutang() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.utangpiutang)
    const data_table = selector.data
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'is_done', //access nested data with dot notation
                header: 'Status',
                Cell : ({cell})=>{
                    var tipe = <span><FontAwesomeIcon icon="fa-solid fa-xmark"/> Belum</span>
                    var color = "text-red-500"
                    if(cell.getValue()){
                        tipe = <span><FontAwesomeIcon icon="fa-solid fa-check"/> Lunas</span>
                        color = "text-green-500"
                    }
                    return <span className={color}><strong>{tipe}</strong></span>
                }
            },
            {
                accessorKey: 'person_in_charge', //access nested data with dot notation
                header: 'Orang Terkait',
            },
            {
                accessorKey: 'type', //access nested data with dot notation
                header: 'Jenis',
                Cell : ({cell})=>{
                    var tipe = "Utang"
                    var color = "text-green-500"
                    if(cell.getValue()=="P"){
                        tipe = "Piutang"
                        color = "text-red-500"
                    }
                    return <span className={color}><strong>{tipe}</strong></span>
                }
            },
            {
                accessorKey: 'tgl_transaksi',
                header: 'Tanggal Transaksi',
                Cell: ({cell}) => {
                    return dayjs(cell.getValue()).format('YYYY-MM-DD (hh:mm),dddd')
                }
            },
            {
                accessorKey: 'keterangan',
                header: 'Keterangan',
            },
            {
                accessorFn: (row) => {
                    var hasil = row.due_date+"_"+row.is_done
                    return hasil;
                },
                header: 'Jatuh Tempo',
                Cell: ({cell}) => {
                    const date = cell.getValue().split("_")
                    var status = 'Tidak Ada Jatuh Tempo'
                    var color = 'text-green-500'

                    const tgl = date[0]
                    const tgl_str = dayjs(tgl).format('YYYY-MM-DD (hh:mm),dddd')
                    if(tgl && date[1]=='false'){
                        if(dayjs(tgl).isBefore(dayjs(),'day') ){
                            status = "(Terlambat) "+tgl_str
                            color = "text-red-500"
                        }else{
                            status = tgl_str
                        }

                    }else if(date[1]!='false'){
                        status = "Lunas"
                    }

                    return <span className={color}>{status}</span>
                }
            },
            {
                accessorKey: 'nominal', //access nested data with dot notation
                header: 'Nominal',
                Cell:({cell})=>{
                    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(cell.getValue())
                }
            },
            {
                accessorKey: 'rekening', //access nested data with dot notation
                header: 'Rekening',
            },
            {
                accessorFn: (row) => {
                    var hasil = "utangpiutang_" + row.id
                    return hasil;
                },
                id: 'id',
                header: 'Opsi',
                enableSorting:false,
                Cell: ({cell}) => {
                    const type = cell.getValue().split("_")
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
        ],
        [],
    );

    return <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Tabel Utang Piutang</h1>
        <MaterialReactTable columns={columns} data={data_table} enableRowActions
                            initialState={
            {pagination:{ pageIndex: 0, pageSize: 5 },
                columnVisibility: { is_done: false }
            }}
        renderRowActionMenuItems={({ closeMenu,row }) => [
            <MenuItem
          key={0}
          onClick={() => {
              dispatch(set_lunas_utangpiutang(row.original.id))
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
                <FontAwesomeIcon icon="fa fa-money-bill"/>
                <span className="ml-2">Ubah Status Pelunasan</span>
        </MenuItem>,
        ]}
        />
    </div>


};

export default TabelUtangPiutang;
