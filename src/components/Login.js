import {useState} from "react";
import React from "react";
import dayjs from "dayjs";


const Login = (props) => {

    const [userInputLogin, setUserInputLogin] = useState('');
    
    const handleLoginChange = (e) => {
        setUserInputLogin(e.currentTarget.value)
    };

    const handleLoginInputSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleLoginInputSubmit }>
                <input
                    type="text"
                    className="input-login"
                    placeholder="Enter login"
                    value={userInputLogin}
                    onChange={handleLoginChange}
                />
                <button className="login">Add task</button>
        </form>
    )
}

export default Login;