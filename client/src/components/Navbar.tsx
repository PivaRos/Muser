import React from "react";
import NavLink from "./Navlink";

const Navbar = () => {
    return (
        <div id="navbar">
            <ul id="navlist">
                <li><NavLink to="/" text="Home"/></li>
                <li><NavLink to="/discover" text="Discover"/></li>
            </ul>
        </div>
    );
}

export default Navbar;