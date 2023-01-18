import React, { useLayoutEffect, useState } from 'react';
import './CreateGroup.css'
import { useEffect, useRef } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CreateGroupPage() {
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [gID, setGID] = useState("");
  let [users, setUsers] = useState([]);
  let [friends, setFriends] = useState([]);
  let [friendsList, setFriendsList] = useState([]);

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
        window.location.reload();
      }
    });
  }

  const addUserGroup = async (gid) => { //function to add user to group after group is created
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

  const getUserGroups = async (id) => { //function to get all groups user is in
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

  const getUsers = async (id) => {  //function to get all users
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
        setUsers(users);
      }
    });
  }

  const hideToggle = (id, name, preference) => { //function to hide add group card
    console.log(id, name, preference);
    //clear localstorage
    localStorage.clear();
    document.getElementById('card-add').removeAttribute('hidden');
    document.getElementById('transparent-dark').removeAttribute('hidden');
    //save id name and preference in localStorage
    localStorage.setItem('groupId', id);
    localStorage.setItem('groupName', name);
    localStorage.setItem('groupPreference', preference);
  }

  const hideToggleView = (id, name, preference) => { //function to hide view group card
    //clear localstorage
    localStorage.clear();
    document.getElementById('card-view').removeAttribute('hidden');
    document.getElementById('transparent-dark').removeAttribute('hidden');
    //save id name and preference in localStorage
    localStorage.setItem('groupId', id);
    localStorage.setItem('groupName', name);
    localStorage.setItem('groupPreference', preference);

    viewFriends(id, userId);
  }

  const showToggleView = () => { //function to show view group card
    document.getElementById('card-view').setAttribute('hidden', 'true');
    document.getElementById('transparent-dark').setAttribute('hidden', 'true');
    localStorage.clear();
  }

  const showToggle = () => { //function to show add group card
    document.getElementById('card-add').setAttribute('hidden', 'true');
    document.getElementById('transparent-dark').setAttribute('hidden', 'true');
    localStorage.clear();
  }

  const addUserToGroup = async (uid) => { //function to add user to group
    const gid = localStorage.getItem('groupId');
    const gname = localStorage.getItem('groupName');
    const gpreference = localStorage.getItem('groupPreference');
    console.log(gid, gname, gpreference, uid);

    const response1 = await axios.get("http://localhost:8080/userGroups/" + uid + '', {
      headers: {
        accessToken: sessionStorage.getItem('accessToken')
      }
    }).then((response1) => {
      if (response1.data.error) {
      }
      else {
        for (let i = 0; i < response1.data.length; i++) {
          if (response1.data[i].groupId == gid) {
            alert("User is already in group");
            return;
          }
        }
        const response = axios.post("http://localhost:8080/createUserGroup", {
          userId: uid,
          groupId: gid,
          groupName: gname,
          preference: gpreference
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
    });
  }

  const viewFriends = (gid, uid) => { //function to get all friends in group
    const response = axios.get("http://localhost:8080/groupMembers/" + gid + '', {
      headers: {
        accessToken: sessionStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
      }
      else {
        friends = [];
        friendsList = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].userId != uid) {
            friends.push(response.data[i].userId);
            console.log(friends);
          }
        }
        for (let i = 0; i < users.length; i++) {
          if (friends.includes(users[i].id)) {
            friendsList.push(users[i]);
          }
          console.log(friendsList);
          setFriendsList(friendsList);
        }
      }
    });
  }



  return (
    <div>
      <div hidden id="transparent-dark"></div>
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
        <h2>Create Group</h2>
        <div id="labels">
          <label>
            Group Name
            <input type="text" name="groupName" id="setGroupName" />
          </label>
          <label>
            Dietary Preference
            <select name="dietaryPreference" id="setPreference">
              <option value=""></option>
              <option value="vegetarian">Vegetarian</option>
              <option value="carnivore">Carnivore</option>
              <option value="zacusca-lover">Zacusca lover</option>
            </select>
          </label>

        </div>
        <button type="button" className="btn btn-success" id="btn-create-group" onClick={createGroup}>Create a Group</button>
        <div >
          <h2>Groups:</h2>
          <ul className="groups-list">
            {groups.map((groups) => (
              <li key={groups.id} className="groups-li" >
                <h3>{groups.groupName}</h3>
                <p>{groups.preference}</p>
                <div className="buttons">
                  <button type="button" className="btn btn-primary btn-view-friends" onClick={() => hideToggleView(groups.groupId, groups.groupName, groups.preference)}>View Friends</button>
                  <button type="button" className="btn btn-primary btn-add-friends" onClick={() => hideToggle(groups.groupId, groups.groupName, groups.preference)}>Add Friends</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Card style={{ width: '30rem' }} id='card-add' hidden>
          <Card.Header id="card-header">
            <button type="button" className="btn-close card-close" aria-label="Close" onClick={showToggle}></button>Add a User to the group</Card.Header>
          <ListGroup variant="flush">
            {users.map((users) => (
              <ListGroup.Item key={users.id} className="groups-li-item" onClick={() => addUserToGroup(users.id)}>
                <h6>{users.username}</h6>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
        <Card style={{ width: '30rem' }} id='card-view' hidden>
          <Card.Header id="card-header">
            <button type="button" className="btn-close card-close" aria-label="Close" onClick={showToggleView}></button>Your friends in this group</Card.Header>
          <ListGroup variant="flush">
            {friendsList.map((friendsList) => (
              <div key={friendsList.id} className="friends-li">
                <ListGroup.Item key={friendsList.userId} className="groups-li-item">
                  <h6>{friendsList.username}</h6>
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Card>
      </div>

    </div>
  );
}

export default CreateGroupPage;
