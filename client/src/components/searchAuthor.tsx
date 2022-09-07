
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


interface props {
    author: string;
}

export const AuthorSearch = (props: props) => {


    const [authorUrlName, setauthorUrlName] = useState<string>(props.author);

    useEffect(() => {
        if (authorUrlName.includes(" ")) {
            setauthorUrlName(authorUrlName.replaceAll(" ", "-"));
        }
    }, [])

    return (
        <li className="li-search"><div className="search-author-div">

            <NavLink className="link" to={"/author/" + authorUrlName}><h4>{props.author}</h4></NavLink>
        </div></li>
    );
};
