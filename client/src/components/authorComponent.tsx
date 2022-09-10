import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface props {
    author: string;
}


 
export const AuthorComponent = (props:props) => {


    const [authorLink, setAuthorLink] = useState(props.author);

    useEffect(() => {
        if (authorLink.includes(" ")) {
        setAuthorLink(authorLink.replaceAll(" ", "-"));
         }
    }, [])



    return (        
        <NavLink onClick={(e) => e.stopPropagation()} className="link" to={"/author/" + authorLink}><label className="track-author">{props.author}</label></NavLink>
        );
}