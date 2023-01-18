import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import fb from '../icons/fb.png';
import wa from '../icons/wa.png';

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

    const getUser = () => { //function to get the user from the backend with the authorization bearer token
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

    useEffect(() => { //useEffect to check if the user is logged in
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
            <div className='container-home'>
                <Container className='container-container'>
                    <h2 className='h2-white'>Welcome to the Anti-Food Waste Application</h2>
                    <p className="white-p">This app helps you keep track of the food in your fridge and prevent food waste.</p>
                    <Row className='row-home'>
                        <Col >
                            <Card className="card-home">
                                <Card.Img variant="top" src="https://images.unsplash.com/photo-1606859191214-25806e8e2423?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=835&q=80" />
                                <Card.Body>
                                    <Card.Title>Track Your Fridge</Card.Title>
                                    <Card.Text>
                                        Keep track of the food in your fridge.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>



                        <Col>
                            <Card className="card-home">
                                <Card.Img variant="top" src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
                                <Card.Body>
                                    <Card.Title>Join a Group</Card.Title>
                                    <Card.Text>
                                        Join a community of like-minded individuals and share tips and recipes for reducing food waste.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div className="socials">
                <a href={`https://web.whatsapp.com/send?text=http://localhost:3000/`} onClick={() => navigator.share({
                    title: 'Anti-Food Waste App',
                    text: 'Check out this app that helps you reduce food waste!',
                    url: 'https://web.whatsapp.com/send?text=http://localhost:3000/'
                })}>
                    <Image src={wa} className="wa" />
                </a>
                <a href="#" onClick={() => navigator.share({
                    title: 'Anti-Food Waste App',
                    text: 'Check out this app that helps you reduce food waste!',
                    url: 'https://www.facebook.com/sharer.php?u=http://localhost:3000/',
                })}>
                    <Image src={fb} className="fb" />
                </a>

            </div>
        </div>
    );
}

export default Home;