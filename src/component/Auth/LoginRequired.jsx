import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function LoginRequired({children}) {
    const {isLoggedIn} = useSelector(state=>state.auth);
    if(!isLoggedIn){
        return <Navigate to="/auth/login"/>
    }

    return children;

}