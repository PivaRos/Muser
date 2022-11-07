import userEvent from "@testing-library/user-event";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../interfaces";
import NavLink from "./Navlink";

interface props {
    user : User | null | undefined;
}


const Navbar = (props:props) => {

    const host = process.env.REACT_APP_url;
    return (
        <div id="navbar">
            <ul id="navlist">
                <li className="nav-li"><img id="nav-icon" className="icon" src="/icon-with-text.png" alt=""/></li>
                <li className="nav-li"><NavLink to="/" text="Home"/></li>
                <li className="nav-li"><NavLink to="/discover" text="Discover"/></li>
                {!props.user && <li className="nav-li"><NavLink to="/login" text="Login"/></li>}
                {props.user?.avatar && <li className="nav-li-avatar"><Link to={"profile/"+props.user.username} className="image-link"><img id="user-avatar" src={host+"/upload/file/"+props.user.avatar} /></Link></li>}
            </ul>
        </div>
    );
}

export default Navbar;