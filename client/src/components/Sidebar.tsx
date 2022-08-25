import React, { useEffect, useState } from "react";
import { string } from "yargs";
import { QueryResults } from '../interfaces';
import searchTrack from "./searchTrack";
import '../css/sidebar.css';
import TrackSearch from "./searchTrack";
import {track} from '../interfaces';


interface props {
    setTrack: React.Dispatch<React.SetStateAction<{
        src: string;
        name: string;
        author: string;
        icon: string;
        likes: number;
        ID: number;
    }>>, 
    activeTrack:track;
}



const Sidebar = (props:props) => {
    const [activeQuery, setActiveQuery] = useState("");
    const [queryResults, setQueryResults] = useState(
        {
            error: false,
            tracks: [
                {
                    src: "",
                    icon: "",
                    name: "",
                    author: "",
                    likes: 0,
                    ID: 0
                }
            ],
            Authors: [
                {
                    name: ""
                }
            ]
        }
    );
    const [loading, setLoading] = useState(false);
    const url = "http://localhost:5000/";

    useEffect(() => {
        if (activeQuery != "") {
            setLoading(true);
            const timeout = setTimeout(() => {
                getResults(activeQuery);
            }, 300);
            return () => { clearTimeout(timeout) }
        }
        else {
            setQueryResults({
                error: true,
                tracks: [{
                    src: "",
                    name: "",
                    icon: "",
                    likes: 0,
                    ID: 0,
                    author: ""
                }],
                Authors: [{ name: "" }]
            })
        }
    }, [activeQuery])




    const getResults = (query: string) => {
        fetch(url + "search/" + query).then(response => {
            response.json().then(data => {
                if (data) {
                    setQueryResults(data);
                    setLoading(false);
                }
                else {
                    const errorresult = queryResults;
                    errorresult.error = true;
                    setQueryResults(errorresult);
                    setLoading(false);
                }
            })

        }).catch(() => {
            const errorresult = queryResults;
            errorresult.error = true;
            setQueryResults(errorresult);
            setLoading(false);
        });
    }


    const SearchChange = (value: string) => {
        setActiveQuery(value);
    }

    return (
        <div id="sidebar">'
            <form>
                <input id="input-search" placeholder="What do you want to listen to?" type="text" onChange={e => { SearchChange(e.target.value) }} />


            </form>
            <ul id="search-ul">
                {
                    !queryResults.error && queryResults.tracks.map((track) => {
                       return <TrackSearch track={track} setTrack={props.setTrack} activeTrack={props.activeTrack}/>
                    })}
            </ul>
            {queryResults.error && activeQuery != "" && !loading && `No results found for "${activeQuery}"`}
        </div>
    );
};

export default Sidebar;