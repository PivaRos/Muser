import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../interfaces";
import NavLink from "./Navlink";
import { Slider } from "./Slider";

interface props {
    user : User | null | undefined;
}


const Navbar = (props:props) => {

    const host = process.env.REACT_APP_url;
    const [dropMenu, setDropMenu] = useState(false);

    const ToggleSlider = () => {
        setDropMenu(!dropMenu);
    }

    useEffect(() => {
        if (!props.user)
        {
            setDropMenu(false);
        }
    }, [props.user])

    return (
        <div id="navbar">
            <ul id="navlist">
                <li className="nav-li"><img id="nav-icon" className="icon" src="/icon-with-text.png" alt=""/></li>
                <li className="nav-li"><NavLink to="/" text="Home"/></li>
                <li className="nav-li"><NavLink to="/discover" text="Discover"/></li>
                {!props.user && <li className="nav-li"><NavLink to="/login" text="Login"/></li>}
                {props.user?.avatar && <li className="nav-li-avatar"><a onClick={ToggleSlider} className="image-link"><img id="user-avatar" src={host+"/upload/file/"+props.user.avatar} /></a></li>}
            </ul>
            <div className="dropDownList">
                {(dropMenu && props.user) && <Slider user={props.user} animation="slide-down" /> }
                { (dropMenu && props.user) &&  <div onClick={ToggleSlider} className="focus-div"></div>}
            </div>
        </div>
    );
}

export default Navbar;