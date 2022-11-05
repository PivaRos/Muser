
import { useState } from "react";
import { User } from "../../interfaces";
import { useNavigate } from 'react-router-dom';
import { Message } from "../../components/message";
import "../../css/login.css";

interface props {
    setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
}

export const LoginPage = (props: props) => {


    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | JSX.Element>();
    const url = "http://localhost:5000";


    const validation = () => {
        if (!username || !password)
        {
            return false;
        }
        return true
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validation()) // validation 
        {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
            try {
                setLoading(true);
                const res = await fetch(url + "/user", options);
                const data1 = await res.json();
                if (res.status === 200) {

                    setMessage(<Message type={"OK"} text={"seccesful login !"} />);
                    setLoading(false);
                    setCookie("SessionID", data1.sessionid, 1);
                    const data = await (await fetch(url + "/user/private", {
                        headers: {
                            "Authorization": getCookie("SessionID")
                        }
                    })).json();
                    props.setUser(data);
                    const ActionID = getCookie("ActionID");
                    if (ActionID)
                    {
                        const optionsDeleteActionRequest = {
                            method:"DELETE",
                            headers:{
                                "Autorization":ActionID
                            }
                        }
                        fetch(url+"/user/register", optionsDeleteActionRequest);
                        delete_cookie("ActionID");

                    }
                    navigate('/');



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
        <div className="page" id="login-div">
            <h3 id="message">{message}</h3>
            {loading && <h2>loading...</h2>}
            <form id="login-form" onSubmit={e => { submit(e) }}>
                <input onChange={e => { setUsername(e.target.value) }} type="input" id="username" placeholder="username"></input><br />
                <input onChange={e => { setPassword(e.target.value) }} type="password" id="password" placeholder="password"></input><br />
                <input id="submit" type="submit" value="Next" />
            </form>

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

