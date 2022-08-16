import React from "react";
import {Link} from "react-router-dom";

interface props  {
    to:string;
    text:string;
    }

const Navlink = (props : props) => {
    return <Link to={props.to} style={{ textDecoration: 'none' }}>{props.text}</Link>
}

export default Navlink;