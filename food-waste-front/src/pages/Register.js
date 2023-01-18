import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
const SERVER_ADDR = "http://localhost:8080";

function Register() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");

    const register = () => {
        axios.post("http://localhost:8080/register", {
            username: usernameReg,
            password: passwordReg,
            firstName: firstNameReg,
            lastName: lastNameReg,
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <div className="registration">
            <h1>Registration</h1>
            <label>Username</label>
            <input type="text-register" onChange={(e) => {
                setUsernameReg(e.target.value);
            }} />
            <label>Password</label>
            <input type="password" onChange={(e) => {
                setPasswordReg(e.target.value);
            }} />

            <label>First Name</label>
            <input type="text-register" onChange={(e) => {
                setFirstNameReg(e.target.value);
            }} />
            <label>Last Name</label>
            <input type="text-register" onChange={(e) => {
                setLastNameReg(e.target.value);
            }} /><button onClick={register}>Register</button>
        </div>
    );
}

export default Register;