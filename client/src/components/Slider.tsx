import { Link } from "react-router-dom";
import  "../css/Slider_nav.css";
import { User } from "../interfaces";


interface props{
animation:string;
user : User | null | undefined;

}


export const Slider = (props:props) => {
    const quitUser = () => {
        setCookie("SessionID", "", 0);
    }
return (
        <div className={"navbar-slider-menu " + props.animation}>
        <ul className="slider-ul">
            <li><Link to={"profile/"+props.user?.username}><label>Profile</label></Link></li>
            <li onClick={quitUser}><label>Logout</label></li> 
        </ul>
        </div>
    );

}

function setCookie(cName: string, cValue: string, expDays: number) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }