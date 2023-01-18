import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const SERVER_ADDR = "http://localhost:8080";

function Login() {

    sessionStorage.removeItem('accessToken');

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    let navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
        }
        ).then((response) => {
            if (response.data.msg) {
                setLoginStatus(response.data.msg);
                if (response.data.msg == 'ok') {
                    sessionStorage.setItem('accessToken', response.data.token);
                    navigate('/');
                }
            }
        });
    }

    const goRegister = () => {
        //change address bar to localhost:3000/register
        window.location.href = "/register";
    }


    return (
        <div className="login">
            <h1>Login</h1>
            <label>Username</label>
            <input type="text-login" onChange={(e) => {
                setUsername(e.target.value);
            }} />
            <label>Password</label>
            <input type="password" onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <button onClick={login}>Login</button>
            <h1>{loginStatus}</h1>

            <div>
                <button onClick={goRegister}>Don't have an account? Click here</button>
            </div>
        </div>
    );
}

export default Login;