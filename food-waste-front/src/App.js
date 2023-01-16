import logo from './logo.svg';
import './App.css';
import { Home } from './home/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  //get users from "http://localhost:8080/users"
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

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

  const login = () => {
    axios.post("http://localhost:8080/login", {
      username: username,
      password: password,
    }).then((response) => {
      //console.log(response);
      if (response.data.msg) {
        setLoginStatus(response.data.msg);
      }
      // else {
      //   setLoginStatus(response.data[0].username);
      // }
    });
  }

  return (
    <div>
      <div className="App">
        <div className="registration">
          <h1>Registration</h1>
          <label>Username</label>
          <input type="text" onChange={(e) => {
            setUsernameReg(e.target.value);
          }} />
          <label>Password</label>
          <input type="password" onChange={(e) => {
            setPasswordReg(e.target.value);
          }} />

          <label>First Name</label>
          <input type="text" onChange={(e) => {
            setFirstNameReg(e.target.value);
          }} />
          <label>Last Name</label>
          <input type="text" onChange={(e) => {
            setLastNameReg(e.target.value);
          }} /><button onClick={register}>Register</button>
        </div>



        <div className="login">
          <h1>Login</h1>
          <label>Username</label>
          <input type="text" onChange={(e) => {
            setUsername(e.target.value);
          }} />
          <label>Password</label>
          <input type="password" onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <button onClick={login}>Login</button>

        </div>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
