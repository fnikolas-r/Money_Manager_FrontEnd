import dayjs from "dayjs";
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import WeekofYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(AdvancedFormat)
dayjs.extend(WeekofYear)

function filter_date(data,recap_by){
    var data_filter = data.map(value=>{
                 return {...value, trc_date:dayjs(value.trc_date).format("DD/MM/YYYY").toString()}
             })
    var limit;

    switch (recap_by) {
         case "all":
             limit = "all"
             break;

         case "7days":
             limit = 7
             break;
         case 'weekly':
             limit = 30
             data_filter = data.map(value=>{
                 return {...value, trc_date:`Week-Y:${dayjs(value.trc_date).format("ww-YYYY ").toString()}`}
             })
             break
         case "monthly":
             limit=12
             data_filter = data.map(value=>{
                 return {...value, trc_date:dayjs(value.trc_date).format("MM/YYYY").toString()}
             })
             break;
         case "annual":
             limit=5
             data_filter = data.map(value=>{
                 return {...value, trc_date:dayjs(value.trc_date).format("YYYY").toString()}
             })
             break
         default:
             limit =30
     }
     return {
        data_filter:data_filter,
         limit:limit
     }
}
function date_range(data,recap_by){
    var limit;
    if(recap_by!='all'){
        const days = recap_by.split('-')
        limit = dayjs().subtract(days[0],days[1])
        var result=  data.filter(value=>{
          return dayjs(value.trc_date).isBefore(dayjs().add(1,'day')) &&
             dayjs(value.trc_date).isAfter(limit)
     })
        return result;
    }

    return data;
}

const TRANSAKSI_SUM = (data,jenis=-1,sorted=false,limit=10,recap_by='all')=>{
    var result = [];

    var data_filter = date_range(data,recap_by).filter(v=>v.kategori!==null && v.trc_type==jenis );
  data_filter.reduce(function(res, value) {
    if (!res[value.kategori] ) {
      res[value.kategori] = { id: value.id, sum: 0, rekening:value.kategori};
      result.push(res[value.kategori])
    }
    res[value.kategori].sum += value.trc_type==jenis ? value.price : 0;
    return res;
  }, {})


    if(sorted){
      result =  result.sort((a,b)=>{
          if(a.sum < b.sum){
              return -1
          }else if(a.sum > b.sum){
              return 1
          }else{
              return 0
          }
      })
    }
    if(limit){
        result = result.splice(0,limit)
    }
    return result;
}

const TRANSAKSI_DATE = (data_raw,jenis,recap_by)=>{
     var result = [];

     var data = data_raw.filter(value=>{return (
         dayjs(data_raw.trc_date).isBefore(dayjs().add(1,'day'))
     ) });

    var {limit,data_filter} = filter_date(data,recap_by)

     data_filter.reduce(function(res, value) {
    if (!res[value.trc_date] ) {
      res[value.trc_date] = { id: value.id, sum: 0, tanggal:value.trc_date};
      result.push(res[value.trc_date])
    }
    res[value.trc_date].sum += jenis=='balance' ? value.price * value.trc_type : value.trc_type==jenis ? value.price : 0;
    return res;
  }, {})


    if (limit==='all'){
        return result;
    }

    return result.splice(0,limit)



}

const DYNAMIC_COLOR = (hex=false)=>{
    if(hex){
        return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
              var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
}

const TRANSAKSI_DATA_FACTORY = (data,jenis,title="",sorted=false,recap_by='all')=>{
    const data_trc = TRANSAKSI_SUM(date_range(data,recap_by),jenis,sorted)
    return {
        labels:data_trc.map(value => {
            return value.rekening
        }),
        datasets:[
            {
                label:`${title} Transaksi Rp`,
                data:data_trc.map(value => {return value.sum}),
                backgroundColor:data_trc.map(()=>{return Data_Services.DYNAMIC_COLOR()}),
                borderWidth:1
            }
        ]
    }
}
const TRANSAKSI_DATE_FACTORY = (data,recap_by='daily',limit=30)=>{
    const data_trc_pendapatan = TRANSAKSI_DATE(data,1,recap_by,limit)
    const data_trc_pengeluaran = TRANSAKSI_DATE(data,-1,recap_by,limit)
    const data_trc = TRANSAKSI_DATE(data,'balance',recap_by,limit)
    return  {
        labels:data_trc.map(value => {
            return value.tanggal
        }),
        datasets:[
            {
                label:`Pengeluaran Transaksi Rp`,
                data:data_trc_pengeluaran.map(value => {return value.sum}),
                backgroundColor:'rgb(255, 99, 132)',
                borderColor:'rgb(255, 99, 132)',
                borderWidth:1
            },
            {
                label:`Pendapatan Transaksi Rp`,
                data:data_trc_pendapatan.map(value => {return value.sum}),
                backgroundColor:'rgb(99,255,107)',
                borderColor:'rgb(99,255,107)',
                borderWidth:1
            },
            {
                label:`Balance Transaksi Rp`,
                data:data_trc.map(value => {return value.sum}),
                backgroundColor:'rgb(99,167,255)',
                borderColor:'rgb(99,167,255)',
                borderWidth:1
            },
        ]
    }

}

const TRANSAKSI_STATS = (data_raw,utang_piutang=[],recap_by='all')=>{

    const data = date_range(data_raw,recap_by)
    var dataset = []
    dataset.push({
        "name":"Total Balance",
        total:data.reduce((accumulator,current_val)=>{
        return accumulator + (current_val.trc_type * current_val.price)
    },0),
        color:'bg-cyan-600'
    })
    dataset.push({
        "name":"Total Pendapatan",
        total:data.reduce((accumulator,current_val)=>{
        return accumulator + (current_val.trc_type ==1 ?  current_val.price : 0)
    },0),
        color:'bg-emerald-600'
    })
    dataset.push({
        "name":"Total Pengeluaran",
        total:data.reduce((accumulator,current_val)=>{
        return accumulator + (current_val.trc_type ==-1 ?  current_val.price : 0)
    },0),
        color:'bg-rose-600'
    })
    dataset.push({
        "name":"Total Utang",
        total:utang_piutang.reduce((accumulator,current_val)=>{
        return accumulator + (current_val.type =="U" ?  current_val.nominal : 0)
    },0),
        color:'bg-indigo-600'
    })
    dataset.push({
        "name":"Total Piutang",
        total:utang_piutang.reduce((accumulator,current_val)=>{
        return accumulator + (current_val.type =="P" ?  current_val.nominal : 0)
    },0),
        color:'bg-gray-600'
    })

    return dataset
}



const Data_Services = {
    TRANSAKSI_DATA_FACTORY,
    TRANSAKSI_DATE_FACTORY,
    TRANSAKSI_STATS,
    TRANSAKSI_SUM,
  DYNAMIC_COLOR
}

export default Data_Services;
