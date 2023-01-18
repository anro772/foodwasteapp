import React, { useState } from 'react';
import './AddFoodForm.css';
import { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CATEGORY_OPTIONS = [{ label: 'Vegetarian', value: 'vegetarian' },
{ label: 'Meat', value: 'meat' },
{ label: 'Dairy', value: 'dairy' },
{ label: 'Fruits', value: 'fruits' },
{ label: 'Bakery', value: 'bakery' },
{ label: 'Vegetables', value: 'vegetables' },
{ label: 'Beverages', value: 'bevarages' },
{ label: 'Dessert', value: 'dessert' }];


function AddFoodForm() {
  const [foodCategory, setFoodCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [foodPrice, setFoodPrice] = useState('');
  const [foodName, setFoodName] = useState('');
  const [errors, setErrors] = useState({});

  const [username, setUsername] = useState("");

  let navigate = useNavigate();

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

  const validate = () => {
    const newErrors = {};
    if (!foodName) {
      newErrors.foodName = 'Food name is required';
    }
    if (!foodPrice) {
      newErrors.foodPrice = 'Food price is required';
    }
    if (isNaN(foodPrice)) {
      newErrors.foodPrice = 'Food price should be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      // send request to backend as before
    } catch (error) {
      console.error(error);
    }
  };

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
      <form className="add-food-form" onSubmit={handleSubmit}>
        <label class="form-item">
          Food Category:
          <select className="form-control" value={foodCategory} onChange={(e) => setFoodCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label class="form-item">
          Food Price:
          <input
            className="form-control"
            type="text"
            value={foodPrice}
            onChange={(event) => setFoodPrice(event.target.value)}
          />
          {errors.foodPrice && <div className="error-message">{errors.foodPrice}</div>}
        </label>
        <br />
        <label class="form-item">
          Food Name:
          <input
            className="form-control"
            type="text"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
          />
          {errors.foodName && <div className="error-message">{errors.foodName}</div>}
        </label>
        <br />
        <button className="add-food-button" type="submit">Add food to fridge</button>
      </form>
    </div>
  );
}

export default AddFoodForm;