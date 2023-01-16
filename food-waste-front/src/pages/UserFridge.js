import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserFridge.css'

function UserFridgePage() {
  const [foodItems, setFoodItems] = useState([]);
//   const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/fridge');
      const data = await response.json();
      setFoodItems(data);
    }
    fetchData();
  }, []);

  const handleAddFood = () => {
    // history.push('/addfood')
  }

  return (
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
    <button className="add-food-button" onClick={handleAddFood}>Add Food</button>
  </div>
  );
}

export default UserFridgePage;