import { use, useState } from "react";
import "./App.css";

function App() {
  const [friends, setFriends] = useState([
    {
      friendID: 1,
      friendName: "Ahmed",
      moneyBalance: 10,
      selected: false,
      photo: "https://i.pinimg.com/474x/71/22/c1/7122c1ac1382dea3563d776c1f158654.jpg",
    },
    {
      friendID: 2,
      friendName: "Omnia",
      moneyBalance: 0,
      selected: false,
      photo: "https://i.pinimg.com/736x/52/d6/16/52d6167f652dd536979aa25fca693e6e.jpg",
    },
    {
      friendID: 3,
      friendName: "Mohamed",
      moneyBalance: 0,
      selected: false,
      photo: "https://i.pinimg.com/474x/c3/91/3d/c3913dc52d35241596ade71e69d29ab0.jpg",
    },
    {
      friendID: 4,
      friendName: "Anas",
      moneyBalance: -20,
      selected: false,
      photo: "https://i.pinimg.com/474x/59/bf/ab/59bfab34a9800cf9ecd37b8f53fe27be.jpg",
    },
    {
      friendID: 5,
      friendName: "Feryal",
      moneyBalance: 0,
      selected: false,
      photo: "https://i.pinimg.com/474x/4b/cf/5f/4bcf5fdfb488f871b07a3556f4305af8.jpg",
    },
    {
      friendID: 6,
      friendName: "Balqis",
      moneyBalance: 0,
      selected: false,
      photo: "https://i.pinimg.com/474x/9d/49/4a/9d494a32dbb923780bee47dd34786566.jpg",
    },
  ]);
  const [addFlag, setAddFlag] = useState(false);
  const [passedFriend, setPassedFriend] = useState({});
  return (
    <div className="app">
      <FriendsList
        friends={friends}
        setAddFlag={setAddFlag}
        setPassedFriend={setPassedFriend}
        passedFriend={passedFriend}
      />
      <div className="rightSide">
        <BillDetails
          passedFriend={passedFriend}
          setPassedFriend={setPassedFriend}
          friends={friends}
          setFriends={setFriends}
        />
        <RegCard
          friends={friends}
          setFriends={setFriends}
          addFlag={addFlag}
          setAddFlag={setAddFlag}
        />
      </div>
    </div>
  );
}

function FriendsList({ friends, setAddFlag, setPassedFriend, passedFriend }) {
  return (
    <div className="friendsList">
      {friends.map((friend) => (
        <Friend
          key={friend.friendID}
          friend={friend}
          friends={friends}
          setPassedFriend={setPassedFriend}
        />
      ))}
      <button className="addFriendBtn" onClick={() => setAddFlag(true)}>
        Add Friend
      </button>
    </div>
  );
}

function Friend({ friend, friends, setPassedFriend }) {
  function passFriend(id) {
    let selectedFriend = friends.filter((f) => f.friendID === id && f);
    setPassedFriend(selectedFriend[0]);
  }
  return (
    <div className="friend">
      <div className="photo">
        <img src={friend.photo} alt="" className="image" />
      </div>
      <div className="friendName">
        {friend.friendName}
        <div
          className="ownStatus"
          style={
            friend.moneyBalance > 0
              ? { color: "#f81515bd" }
              : friend.moneyBalance === 0
              ? { color: "grey" }
              : { color: "#008000c2" }
          }
        >
          {friend.moneyBalance > 0
            ? `You Own ${friend.friendName} ${friend.moneyBalance}$`
            : friend.moneyBalance === 0
            ? `You and ${friend.friendName} are even`
            : `${friend.friendName} Owns You ${-friend.moneyBalance}$`}
        </div>
      </div>
      <button className="selectBtn" onClick={() => passFriend(friend.friendID)}>
        Select
      </button>
    </div>
  );
}

function BillDetails({ passedFriend, setPassedFriend, friends, setFriends }) {
  const [myExpense, setMyexpense] = useState(0);
  const [billCost, setBillCost] = useState(0);
  let taken = billCost - myExpense;
  const [choice, setChoice] = useState("you");
  function handleSplit(id) {
    if (choice === "friend") {
      let updatedFriends = friends.map((fr) =>
        fr.friendID === id
          ? { ...fr, moneyBalance: fr.moneyBalance + myExpense }
          : fr
      );
      setFriends(updatedFriends);
    } else if (choice === "you") {
      let updatedFriends = friends.map((fr) =>
        fr.friendID === id
          ? { ...fr, moneyBalance: fr.moneyBalance - taken }
          : fr
      );
      setFriends(updatedFriends);
    }
  }
  return (
    <div
      className="billDetails"
      style={passedFriend.friendID ? {} : { display: "none" }}
    >
      <h3>{`SPLIT THE BILL WITH ${passedFriend.friendName}`}</h3>
      <div className="billCost">
        <label htmlFor="billValue">💰 Bill Value</label>
        <input
          type="text"
          name=""
          id="billValue"
          onChange={(e) => setBillCost(parseInt(e.target.value))}
        />
      </div>
      <div className="userCost">
        <label htmlFor="userValue">💰 Your Expense</label>
        <input
          type="number"
          name=""
          id="userValue"
          onChange={(e) => setMyexpense(parseInt(e.target.value))}
        />
      </div>
      <div className="friendCost">
        <label htmlFor="friendExpense">{`💰 ${passedFriend.friendName}'s Expense`}</label>
        <input
          type="text"
          name=""
          id="friendExpense"
          placeholder={`${billCost - myExpense}`}
          readOnly
        />
      </div>
      <div className="choice">
        <label htmlFor="who">💰 Who is Paying the bill</label>
        <select name="" id="who" onChange={(e) => setChoice(e.target.value)}>
          <option value="Choose">Choose Who'll pay</option>
          <option value="you">You</option>
          <option value="friend">{passedFriend.friendName}</option>
          <option value="both">Both</option>
        </select>
      </div>
      <button
        className="splitBillBtn"
        onClick={() => handleSplit(passedFriend.friendID)}
      >
        Split Bill
      </button>
      <button className="cancel" onClick={() => setPassedFriend({})}>
        Cancel
      </button>
    </div>
  );
}

function RegCard({ friends, setFriends, addFlag, setAddFlag }) {
  const [newFriend, setNewFriend] = useState({
    friendID: friends[friends.length - 1].friendID + 1,
    friendName: "",
    moneyBalance: 0,
    selected: false,
    photo: "",
  });
  function handleAddFriend() {
    setFriends([...friends, newFriend]);
  }
  return (
    <div className="card" style={!addFlag ? { display: "none" } : {}}>
      <div className="userName">
        <label htmlFor="name">👭 Friend Name</label>
        <input
          type="text"
          name=""
          id="name"
          onChange={(e) =>
            setNewFriend({ ...newFriend, friendName: e.target.value })
          }
        />
      </div>
      <div className="addImage">
        <div className="ImageUrl">
          <label htmlFor="url">🖼 Friend Photo's URL</label>
          <input
            type="text"
            name=""
            id="url"
            onChange={(e) =>
              setNewFriend({ ...newFriend, photo: e.target.value })
            }
          />
        </div>
      </div>
      <button className="submitAddFriendBtn" onClick={handleAddFriend}>
        Add
      </button>
      <button className="cancel" onClick={() => setAddFlag(false)}>
        Cancel
      </button>
    </div>
  );
}

export default App;
