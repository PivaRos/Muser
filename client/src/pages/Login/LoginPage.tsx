import { wait } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { User } from "../../interfaces";
import {Routes, Route, useNavigate} from 'react-router-dom';

interface props{
    setUser: React.Dispatch<React.SetStateAction<boolean | User>>;
}

export const LoginPage = (props:props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const url = "http://localhost:5000";

    const submit  = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (true) // validation
        {
            const options = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            }
            try{
                const res =  await fetch(url+"/user", options);
                const data1 = await res.json();
                if(res.status == 200)
                {
                    setMessage("seccesful login !");
                    setCookie("SessionID", data1.sessionid, 1);
                    let sessionid = "";
                    const data = await (await fetch(url+"/user/private", {
                        headers:{
                            "Authorization":getCookie("SessionID")
                        }
                    })).json();
                    props.setUser(data);
                    navigate('/');
                    
                    

                }
                else
                {
                    setMessage("user was not found");
                }
            }
            catch
            {
                setMessage("ERROR");
            }

            

          
        }
    }

    return (
        <div id="login-div">
            <h2>Login</h2>
            <h2>{message}</h2>
        <form onSubmit={e => { submit(e)}}>
            <input onChange={e => {setUsername(e.target.value)}} type="input" id="username" placeholder="username"></input><br />
            <input onChange={e => {setPassword(e.target.value)}} type="password" id="password" placeholder="password"></input>
            <input type="submit" value="Next"/>
        </form>

        </div>
    ); 
}

function setCookie(cName:string, cValue:string, expDays:number) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(cname:string) {
    var cookies = ` ${document.cookie}`.split(";");
    var val = "";
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie[0] == ` ${cname}`) {
        return cookie[1];
      }
    }
    return "";
  }