import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Routes, Link } from 'react-router-dom';
import Login from "./pages/Login";
import Register from './pages/Register';
import Home from './pages/Home';
import UserFridgePage from './pages/UserFridge';
import CreateGroupPage from './pages/CreateGroup';
import AddFoodForm from './pages/AddFood';

function App() {
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/fridge" exact element={<UserFridgePage />}></Route>
        <Route path="/groups" exact element={<CreateGroupPage />}></Route>
        <Route path="/addfood" exact element={<AddFoodForm />}></Route>
      </Routes>
    </Router>
  </div>
}

export default App;
