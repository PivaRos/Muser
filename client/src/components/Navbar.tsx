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
                <li><img id="nav-icon" className="icon" src="/icon-with-text.png" alt=""/></li>
                <li><NavLink to="/" text="Home"/></li>
                <li><NavLink to="/discover" text="Discover"/></li>
                {!props.user && <li><NavLink to="/login" text="Login"/></li>}
                {props.user && <li><NavLink to="/" text="asd"/></li>}
            </ul>
        </div>
    );
}

export default Navbar;