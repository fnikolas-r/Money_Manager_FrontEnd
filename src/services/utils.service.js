const to_rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
}

const UtilServices = {
    to_rupiah
}

export default UtilServices;