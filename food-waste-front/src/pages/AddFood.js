import React, { useState } from 'react';
import './AddFoodForm.css';

const CATEGORY_OPTIONS = [  { label: 'Vegetarian', value: 'vegetarian' },  
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
      );
}

export default AddFoodForm;