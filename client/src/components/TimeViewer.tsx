import { useEffect } from "react";



interface props{
    seconds:number
}

export const TimeView = (props:props) => {


    useEffect(() => {
        
    }, [props])
    if (!isNaN(props.seconds) && !isNaN(Math.round(props.seconds)%60) ){
    return (<>
        {(Math.round(props.seconds/60))< 10 && "0"}{Math.round(props.seconds/60)}:{(Math.round(props.seconds)%60)< 10 && "0"}{Math.round(props.seconds)%60}
        </>);
    }
    else
    {
        return (<></>);
    }
}