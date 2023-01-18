import React, { useState, useRef } from 'react';
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
  const [availability, setAvailability] = useState('');
  const [errors, setErrors] = useState({});

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  let navigate = useNavigate();

  const dataFetch = useRef(false);




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
        setUserId(response.data.id);
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

  const addFood = () => {

    if (foodName && availability) {
      const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (dateRegex.test(availability)) {
        axios.post("http://localhost:8080/addUserFridge", {
          userId: userId,
          foodName: foodName,
          availability: availability,
          foodCategory: foodCategory,
        }).then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          }
          else {
            console.log(response.data);
          }
        });
      }
    }
  }

  useEffect(() => {
    if (!dataFetch.current) {

      //check if session storage has accessToken
      if (!sessionStorage.getItem('accessToken')) {
        navigate('/login');
      }

      getUser();
      dataFetch.current = true;
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!foodName) {
      newErrors.foodName = 'Food name is required';
    }
    if (!availability) {
      newErrors.availability = 'Food availability is required';
    }

    //check availability is date type in format /dd/mm/yyyy for example 01/01/2021
    if (availability) {
      const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (!dateRegex.test(availability)) {
        newErrors.availability = 'Availability must be a date';
      }
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

      <form className="add-food-form" onSubmit={handleSubmit}>
        <label className="form-item">
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

        <br />
        <label className="form-item">
          Food Name:
          <input
            className="form-control"
            type="text"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
          />
          {errors.foodName && <div className="error-message">{errors.foodName}</div>}
        </label>
        <label className="form-item">
          Availability:
          <input
            className="form-control"
            type="text"
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
          />
          {errors.availability && <div className="error-message">{errors.availability}</div>}
        </label>
        <br />
        <button className="add-food-button" type="submit" onClick={addFood}>Add food to fridge</button>
      </form>

    </div>
  );
}

export default AddFoodForm;