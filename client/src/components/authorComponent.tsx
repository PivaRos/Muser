import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface props {
    author: string;
    key:number;
}


 
export const AuthorComponent = (props:props) => {
    const getLink = () => {
        if (props.author.includes(" ")) {
            let authorclone = props.author;
           return authorclone.replaceAll(" ", "-");
        }
        else{
            return props.author;
        }
    }




    return  (        
        <NavLink onClick={(e) => e.stopPropagation()} className="link" to={"/author/" + getLink()}><label className="track-author">{props.author}</label></NavLink>
        );
}