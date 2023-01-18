 import React, { useState } from 'react';
 import './group.css'
 import { useEffect } from 'react';



function App() {
  const [groups, setGroups] = useState([]);

  function handleCreateGroup(event) {
    event.preventDefault();
    const groupName = event.target.groupName.value;
    const dietaryPreference = event.target.dietaryPreference.value;
    setGroups([...groups, { groupName, dietaryPreference, friends: [] }]);
  }

  function handleAddFriend(groupIndex, event) {
    event.preventDefault();
    const newFriend = event.target.friendName.value;
    const updatedGroup = { ...groups[groupIndex] };
    updatedGroup.friends = [...updatedGroup.friends, newFriend];
    const newGroups = [...groups];
    newGroups[groupIndex] = updatedGroup;
    setGroups(newGroups);
  }

  return (
    <div className="App">
      <h2>Create Group:</h2>
      <form onSubmit={handleCreateGroup}>
        <label>
          Group Name:
          <input type="text" name="groupName" />
        </label>
        <label>
          Dietary Preference:
          <select name="dietaryPreference">
            <option value=""></option>
            <option value="vegetarian">Vegetarian</option>
            <option value="carnivore">Carnivore</option>
            <option value="zacusca-lover">Zacusca lover</option>
          </select>
        </label>
        <input type="submit" value="Create Group" />
      </form>
      <div>
        <h2>Groups:</h2>
        <ul className="groups-list">
          {groups.map(({ groupName, dietaryPreference, friends }, groupIndex) => (
            <li key={groupIndex}>
              <h3>{groupName} - {dietaryPreference}</h3>
              <form onSubmit={handleAddFriend.bind(null, groupIndex)}>
                <label>
                  Add Friend:
                  <input type="text" name="friendName" />
                </label>
                <input type="submit" value="Add Friend" />
              </form>
              <div className="friends-list">
                <h4>Friends:</h4>
                <ul>
                  {friends.map((friend, friendIndex) => (
                    <li key={friendIndex}>{friend}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default App;



//export default {FriendGroupForm};
