import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {track} from '../interfaces';


interface props {
    author:string;
}

 export const AuthorSearch = (props : props) => {

    return (
        <li className="li-search"><div className="search-author-div">
            <NavLink className="link" to={"/author/"+props.author}><h4>{props.author}</h4></NavLink>
        </div></li>
    );
};
