import React, { useEffect } from "react"
import { author } from '../../interfaces';
import { useParams } from "react-router-dom";

interface props {
    author: author;
}


export const AuthorComp = (props: props) => {
    let { authorName } = useParams();
    authorName = authorName?.replaceAll("-", " ");
    

    useEffect(() => {

    }, [])

    return (<div className="page" id="page-author">
        <h1>{authorName}</h1>
        <div >
            <h3 id="author-from-label">More From Him:</h3>
            </div>
    </div>);
}