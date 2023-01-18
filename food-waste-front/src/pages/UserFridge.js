import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './UserFridge.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserFridgePage() {
  let [foodItems, setFoodItems] = useState([]);
  const [username, setUsername] = useState("");
  //const [userId, setUserId] = useState("");
  //   const history = useHistory();
  let [userId, setUserId] = useState("");

  let navigate = useNavigate();

  const dataFetch = useRef(false);

  useEffect(() => {
    if (!dataFetch.current) {
      getUser();
      dataFetch.current = true;
    }
  }, []);

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
        userId = response.data.id;
        getFoods(userId);
      }
    });
  }

  const getFoods = async (id) => {
    axios.get('http://localhost:8080/foodsInFridge/' + id + '', {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      }
      else {
        foodItems = response.data;
        setFoodItems(foodItems);
        foodItems = response.data;
        setFoodItems(foodItems);
        console.log(foodItems);
      }
    });
  }

  const removeFridge = async (id) => {
    axios.post('http://localhost:8080/removeUserFridge', {
      id: id,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      }
      else {
        //refresh page
        window.location.reload();
      }
    });
  }

  const consoleLog = async (id) => {
    console.log(id);
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

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={onClickHome} href="/" id="home-nav">Home</Navbar.Brand >
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
        <button className="add-food-button" onClick={onClickAddFood}>Add Food</button>
        <p>Here are the items you have added to your fridge</p>
        <ul className="food-list">
          {foodItems.map((item) => (
            <div className='list-item' key={item.id}>
              <li key={item.id}>
                {item.foodCategory} - {item.foodName} - {item.availability}
              </li>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => removeFridge(item.id)}></button>
            </div>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default UserFridgePage;