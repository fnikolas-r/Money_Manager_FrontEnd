import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Loading from "../MicroComponent/Loading";

export default function LoginRequired({children}) {
    const {isLoggedIn,isLoading} = useSelector(state=>state.auth);
    if(!isLoggedIn){
        return <Navigate to="/auth/login"/>
    }

    if(isLoading && isLoggedIn){
        return <Loading/>;
    }

    return children;

}