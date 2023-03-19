import logo from '../../assets/logo.png';
import {useSelector,useDispatch} from "react-redux";
import {bootstrap} from "../../storage/slices/auth.js";
import {useEffect, useState} from "react";

export default function Loading({children}){
   const {isLoading} = useSelector(state=>state.auth);
    const list_text = ["Loading...","Mempersiapkan Data","Memproses","Tunggu Sebentar"]
    const [txtIdx, setTxtIdx] = useState(0);

    useEffect(() => {
        return () => {

            setInterval(() => {

                setTxtIdx(prevState => prevState+1);


                }, 3000)
        };
    }, []);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(bootstrap());
    },[])

       return <>
        <div className="flex content-center items-center animate-pulse h-[100vh] m-0 p-0">
            <div className="content-center w-[100vw]">
                <img src={logo} alt="" width="250vw" className={"object-center mx-auto"}/>
            <h1 className="text-3xl  text-center font-bold ">{list_text[txtIdx%list_text.length]}</h1>
            </div>
        </div>

           </>

}