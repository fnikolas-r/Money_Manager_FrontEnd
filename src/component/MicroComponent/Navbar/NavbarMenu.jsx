import {NavLink, useLocation} from "react-router-dom";
import {Fragment} from "react";

export default function NavbarMenu(props) {
    return <Fragment>
        <NavLink  to={props.link}
                    className={({ isActive }) => (isActive ? 'border-b-2 ' : ' ')+"border-indigo-500 " +
                        "text-gray-900 inline-flex" +
                        " items-center px-1 pt-1 text-sm font-medium"}>{props.name}</NavLink>
    </Fragment>


}