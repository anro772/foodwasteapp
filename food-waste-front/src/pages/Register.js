import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_ADDR = "http://localhost:8080";

function Register() {
    let [usernameReg, setUsernameReg] = useState("");
    let [passwordReg, setPasswordReg] = useState("");
    let [firstNameReg, setFirstNameReg] = useState("");
    let [lastNameReg, setLastNameReg] = useState("");

    let navigate = useNavigate();

    const register = () => {
        axios.post("http://localhost:8080/register", {
            username: usernameReg,
            password: passwordReg,
            firstName: firstNameReg,
            lastName: lastNameReg,
        }).then((response) => {
            console.log(response.data);
            axios.post("http://localhost:8080/login", {
                username: response.data.username,
                password: response.data.password
            }).then((response) => {
                if (response.data.msg) {
                    if (response.data.msg == 'ok') {
                        console.log('ok');
                        sessionStorage.setItem('accessToken', response.data.token);
                        navigate('/');
                    }
                }
            });
        });
    }

    return (
        <div className="registration">
            <h1>Registration</h1>
            <label>Username</label>
            <input type="text-register" onChange={(e) => {
                usernameReg = e.target.value;
            }} />
            <label>Password</label>
            <input type="password" onChange={(e) => {
                passwordReg = e.target.value;
            }} />

            <label>First Name</label>
            <input type="text-register" onChange={(e) => {
                firstNameReg = e.target.value;
            }} />
            <label>Last Name</label>
            <input type="text-register" onChange={(e) => {
                lastNameReg = e.target.value;
            }} /><button onClick={register}>Register</button>
        </div>
    );
}

export default Register;