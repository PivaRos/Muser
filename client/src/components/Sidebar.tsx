import React, { useEffect, useState } from "react";
import '../css/sidebar.css';
import { TrackSearch } from "./searchTrack";
import { track } from '../interfaces';
import { AuthorSearch } from "./searchAuthor";


interface props {
    setTrack: React.Dispatch<React.SetStateAction<track>>,
    activeTrack: track;
}



const Sidebar = (props: props) => {
    const [activeQuery, setActiveQuery] = useState("");
    const [queryResults, setQueryResults] = useState(
        {
            error: false,
            tracks: [
                {
                    src: "",
                    icon: "",
                    name: "",
                    author: [""],
                    likes: 0,
                    _id: ""
                }
            ],
            authors: [
                { name: "" }
            ]
        }
    );
    const [loading, setLoading] = useState(false);
    const url = "http://localhost:5000/";

    useEffect(() => {
        if (activeQuery !== "") {
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
                    _id: "",
                    author: [""]
                }],
                authors: [{ name: "" }]
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
            {!queryResults.error &&
                <><ul className="search-ul">
                    <li className="searchCategory"><h3>Tracks</h3></li>
                    {queryResults.tracks && queryResults.tracks.length > 0 && queryResults.tracks.map((track) => {
                        return <TrackSearch key={track._id} track={track} setTrack={props.setTrack} activeTrack={props.activeTrack} />;
                    })}
                    {queryResults.authors.length > 0 && <li className="searchCategory"><h3>Authors</h3></li>}
                    {queryResults.authors && queryResults.authors.length > 0 && queryResults.authors.map((author, index) => {
                        return <AuthorSearch key={index} author={author.name} />;
                    })}
                </ul></>
            }
            {queryResults.error && activeQuery != "" && !loading && `No results found for "${activeQuery}"`}
        </div>
    );
};

export default Sidebar;