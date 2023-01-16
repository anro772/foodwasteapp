import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";


const SERVER_ADDR = "http://localhost:8080";

const Home = () => {
    //display the home page

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     //display all users
    //     axios.get(`${SERVER_ADDR}/users`).then(res => dispatch(console.log(res.data)));
    // }, []);

    // return (
    //     <div className="home">
    //         <h1>Home</h1>
    //     </div>
    // );

}

export { Home };