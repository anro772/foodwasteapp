import React, { useLayoutEffect, useState } from 'react';
import './CreateGroup.css'
import { useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateGroupPage() {
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [gID, setGID] = useState("");
  let [users, setUsers] = useState([]);

  const setUsersWithCallback = (newUsers, callback) => {
    setUsers(newUsers, callback);
  }

  let navigate = useNavigate();

  const dataFetch = useRef(false);

  useEffect(() => {
    if (!dataFetch.current) {
      getUser();
      dataFetch.current = true;
    }
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:8080/current", {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    });
    if (response.data.error) {
      console.log(response.data.error);
    }
    else {
      setUsername(response.data.username);
      setUserId(response.data.id);
      await getUserGroups(response.data.id);
      await getUsers(response.data.id);
      console.log(users);
    }
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




  const createGroup = async () => {
    const response = await axios.post("http://localhost:8080/createGroup", {
      groupName: document.getElementById("setGroupName").value
    },
      {
        headers: {
          accessToken: sessionStorage.getItem('accessToken')
        }
      }
    ).then((response,) => {
      setGID(response.data.id);
      if (response.data.error) {
        console.log(response.data.error);
      }
      else {
        console.log(response.data.id);
        addUserGroup(response.data.id);
      }
    });
  }


  const addUserGroup = async (gid) => {
    const response = await axios.post("http://localhost:8080/createUserGroup", {
      userId: userId,
      groupId: gid,
      groupName: document.getElementById("setGroupName").value,
      preference: document.getElementById("setPreference").options[document.getElementById("setPreference").selectedIndex].value
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
        console.log(response.data);
      }
    }
    );
  }

  const getUserGroups = async (id) => {
    const response = await axios.get("http://localhost:8080/userGroups/" + id + '', {
      headers: {
        accessToken: sessionStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
      }
      else {
        setGroups(response.data);
      }
    });
  }

  const getUsers = async (id) => {
    await axios.get("http://localhost:8080/users", {
      headers: {
        accessToken: sessionStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      }
      else {
        users = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id != id) {
            users.push(response.data[i]);
          }
        }
      }
    });
  }



  return (
    <div>

      <Navbar bg="light" expand="lg" >
        <Navbar.Brand onClick={onClickHome} href="/" id="home-nav" >Home</Navbar.Brand >
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
      <div className="CreateGroupPage">
        <h2>Create Group:</h2>
        <div>
          <label>
            Group Name:
            <input type="text" name="groupName" id="setGroupName" />
          </label>
          <label>
            Dietary Preference:
            <select name="dietaryPreference" id="setPreference">
              <option value=""></option>
              <option value="vegetarian">Vegetarian</option>
              <option value="carnivore">Carnivore</option>
              <option value="zacusca-lover">Zacusca lover</option>
            </select>
          </label>
          <button onClick={createGroup}>Create Group</button>
        </div>
        <div >
          <h2>Groups:</h2>
          <ul className="groups-list">
            {groups.map((groups) => (
              <li key={groups.id} className="groups-li">
                <h3>{groups.groupName}</h3>
                <p>{groups.preference}</p>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );

}

export default CreateGroupPage;
