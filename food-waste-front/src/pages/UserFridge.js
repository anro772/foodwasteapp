import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserFridge.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserFridgePage() {
  const [foodItems, setFoodItems] = useState([]);
  //   const history = useHistory();

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/fridge');
      const data = await response.json();
      setFoodItems(data);
    }
    fetchData();
  }, []);

  const [username, setUsername] = useState("");

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

  function onClickAddFood() {
    navigate('/addfood')
  }

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

  function onClickHome() {
    navigate('/');
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={onClickHome} id="home-nav">Home</Navbar.Brand >
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
      <div className="user-fridge-page">
        <h1>Your Fridge</h1>
        <p>Here are the items you have added to your fridge</p>
        <ul className="food-list">
          {foodItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.category} - {item.price}
            </li>
          ))}
        </ul>
        <button className="add-food-button" onClick={onClickAddFood}>Add Food</button>
      </div>
    </div>
  );
}

export default UserFridgePage;