import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {

    const [username, setUsername] = useState("");

    const headers = new Headers({
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
    });

    const getUser = () => {
        axios.get("http://localhost:8080/current", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        }).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
            }
            else {

                setUsername(response.data.username);
            }
        });
    }


    //VERY IMPORTANT ----------------------------------------------------
    const logSomething = () => {
        axios.post("http://localhost:8080/addFood", {
            category: "Vegetable",
            price: "3",
            foodName: "Potato"
        },
            {
                headers: {
                    accessToken: sessionStorage.getItem('accessToken')
                }
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
            }
            else {
                // console.log(response);
                console.log('aaaaaaa');
                console.log(response.data);
            }
        });
    }
    //VERY IMPORTANT ----------------------------------------------------


    useEffect(() => {
        getUser();
    }, []);

    console.log(username);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home" id="home-nav">Home</Navbar.Brand >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#fridge">Fridge</Nav.Link>
                        <Nav.Link href="#groups">Groups</Nav.Link>
                    </Nav>
                    <Nav className='account-name'>
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item className="nav-dropdown" href="#action/3.1">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div>
                <button>Post</button>
            </div>
        </div>
    );
}

export default Home;