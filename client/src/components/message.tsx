import { useEffect, useState } from "react";

interface props{
    type:"ERROR" | "OK" | "WORNING";
    text:string;
}

export const Message = (props:props) => {

    const [color, setColor] = useState("red");

    useEffect(() => {
        if (props.type === "OK")
        {
            setColor("green");
        }
        else if (props.type === "WORNING")
        {
            setColor("yellow");
        }
    },[]);

    return (<div id="messageDiv">
        <span style={{color:color}}>{props.text}</span>
    </div>);
}