import React from "react";
import { User } from "../interfaces";
import NavLink from "./Navlink";

interface props {
    user : User | null | undefined;
}
const Navbar = (props:props) => {
    return (
        <div id="navbar">
            <ul id="navlist">
                <li><NavLink to="/" text="Home"/></li>
                <li><NavLink to="/discover" text="Discover"/></li>
                {!props.user && <li><NavLink to="/login" text="Login"/></li>}
            </ul>
        </div>
    );
}

export default Navbar;