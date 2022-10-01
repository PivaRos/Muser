import React from 'react'
import { User } from '../../interfaces';


interface props{
    user:User | null | undefined;
}

const Home = (props:props) => {
    



    return (
        <div className="page" id="home">
            {!props.user && <h2>Welcome To Muser !</h2>}
            {props.user && <h2>Welcome {props.user.username}</h2>}
        </div>
    );  
}

export default Home;
