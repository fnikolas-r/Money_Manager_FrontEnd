import TransactionMeter from "./TransactionMeter.jsx";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

export default function TransactionMeterSection() {
    const rekening = useSelector(state => state.rekening);
    const transaksi = useSelector(state => state.transaksi)

    const transaksi_list = transaksi.data;

    const expense_today = Math.round(transaksi_list.filter(
        v => (v.is_protected == false && v.id_transfer == null && v.id_utang_piutang == null &&
            v.trc_type == -1 && dayjs(v.trc_date).isSame(dayjs(), 'day'))
    ).reduce((acc, current) => acc + current.price, 0))

    const {summary} = rekening;
    const count_transferable_amount = (data) => {
        let transferable_amounts = 0;
        data.forEach((items) => {
            const valid_amount = items.trf_minimum !== 0 ? items.total - (items.total % items.trf_minimum) : items.total
            transferable_amounts = transferable_amounts + valid_amount
        })
        return transferable_amounts
    }
    // #TODO: refactor it later
    const get_amount_per_month = (amount) => {
        const days_left = dayjs().endOf('month').diff(dayjs(), 'days')
        return Math.round(amount / days_left)
    }

    const limit_trc = get_amount_per_month(count_transferable_amount(summary.filter(a => !a.rekening_hidden)))
    return <>
        <div className="px-2 py-3 border border-0.5 mx-7 rounded">
            <div className="text-center text-gray-800 select-none"><i>Budgeting</i></div>
            <div className="flex">
                <div className="w-full md:w-1/3">
                    <TransactionMeter max={limit_trc} current={expense_today==0?0.001:expense_today} title="Limit Pengeluaran Harian"/>
                </div>
            </div>
        </div>
    </>;

}