import React, { useEffect, useState } from "react";
interface Author{
    name:string;
}

interface track  {
    src : string;
    icon:string;
    name:string;
    author:string;
    ID:number;
    likes:number;
}

interface QueryResults {
    Authors:Author[];
    Tracks:track[];
}

const Sidebar = () => {

    const [activeQuery, setActiveQuery] = useState("");
    const [queryResults, setQueryResults] = useState()
    useEffect(() => {

    }, [activeQuery])

    const SearchChange = (value:string) => {
       setActiveQuery(value);
    }

    return (
        <div id="sidebar">'
        <form>
            <input id="input-search" type="text" onChange={e => {SearchChange(e.target.value)}}/>
        </form>
        </div>
    );
};

export default Sidebar;