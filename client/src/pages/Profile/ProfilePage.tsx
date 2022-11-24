
import { useEffect, useState } from "react";
import { User } from "../../interfaces";
import { useNavigate, useParams } from 'react-router-dom';
import { Message } from "../../components/message";
import "../../css/profile.css";

interface props {
    setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
    user: User | null | undefined;
}

export const ProfilePage = (props: props) => {


    const navigate = useNavigate();
    const [withEdit, setWithEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    let { username } = useParams();
    const [message, setMessage] = useState<string | JSX.Element>();
    const url = process.env.REACT_APP_url;
    const [CurrentUser, setCurrentUser] = useState<User | null | undefined>()

    useEffect(() => {
        if (props.user && props.user.username === username)
        {
            setWithEdit(true);
        }
        else if (withEdit){
            setWithEdit(false);
        }
    }, [props.user]);

    useEffect(() => {
        if (username)
        {
            submit();
        }
    }, [])

    const submit = async () => {
        if (true) // validation 
        {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
            try {
                setLoading(true);
                const res = await fetch(url + "/user/public/"+username, options);
                const data1 = await res.json();
                if (res.status === 200) {
                    setCurrentUser(data1);
                    setLoading(false);
                }
                else {
                    setMessage(<Message type={"ERROR"} text={"user was not found"} />);
                    setLoading(false);
                }
            }
            catch
            {
                setMessage(<Message type={"ERROR"} text={"Oops Something Went Wrong !"} />);
                setLoading(false);
            }




        }
    }

    return (
        <div className="page" id="profile-div">
            <h3 id="message">{!CurrentUser && message}</h3>
            {loading && <h2>loading...</h2>}
            {!loading &&<div className="contain-profile">
            <div className="profile-avatar">
            <img src={url+ "/upload/file/"+CurrentUser?.avatar}/>
            </div>
            <div className="user-details">
                <label>username</label><br/>
                <label></label>
                <label>bio</label>
                <label></label><br/>
            </div>
            <div className="profile-friends"></div>
            </div>}
        </div>
    );
}

function setCookie(cName: string, cValue: string, expDays: number) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(cname: string) {
    var cookies = ` ${document.cookie}`.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === ` ${cname}`) {
            return cookie[1];
        }
    }
    return "";
}


function delete_cookie(name:string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

