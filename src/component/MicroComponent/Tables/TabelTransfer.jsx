import React, {useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {setinputmodalstatus} from "../../../storage/slices/component.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function TabelTransfer() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.transfer)
    const data_table = selector.data
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'from_account', //access nested data with dot notation
                header: 'Rekening Sumber',
            },
            {
                accessorKey: 'to_account', //access nested data with dot notation
                header: 'Rekening Tujuan',
            },
            {
                accessorKey: 'nominal', //access nested data with dot notation
                header: 'Nominal',
                Cell:({cell})=>{
                    return new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(cell.getValue())
                }
            },
            {
                accessorKey: 'tgl_transfer',
                header: 'Tanggal Transfer',
                Cell: ({cell}) => {
                    return dayjs(cell.getValue()).format('dddd, DD MMM YYYY (hh:mm)')
                }
            },
            {
                accessorFn: (row) => {
                    var hasil = "transfer_" + row.id
                    return hasil;
                },
                id: 'id',
                header: 'Action',
                size:50,
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
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Tabel Transfer</h1>
        <MaterialReactTable columns={columns} data={data_table}/>
    </div>


};

export default TabelTransfer;
