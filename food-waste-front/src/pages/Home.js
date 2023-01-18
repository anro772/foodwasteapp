import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

    let navigate = useNavigate();

    function onClickFridge() {
        navigate('/fridge');
    }

    function onClickLogout() {
        sessionStorage.removeItem('accessToken');
        navigate('/login');
    }

    function onClickGroups() {
        navigate('/groups');
    }

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

    useEffect(() => {
        //check if session storage has accessToken
        if (!sessionStorage.getItem('accessToken')) {
            navigate('/login');
        }
        else
            getUser();
    }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" id="home-nav">Home</Navbar.Brand >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={onClickFridge}>Fridge</Nav.Link>
                        <Nav.Link onClick={onClickGroups}>Groups</Nav.Link>
                    </Nav>
                    <Nav className='account-name'>
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item className="nav-dropdown" onClick={onClickLogout}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        </div>
    );
}

export default Home;