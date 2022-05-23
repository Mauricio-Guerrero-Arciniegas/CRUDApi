import axios from "axios";
import { useEffect, useState } from "react";
// import Modal from "./components/Modal";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";
import "./styles.css";

function App() {
  const [user, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  const addUser = (userItem) => {
    axios
      .post("https://users-crud1.herokuapp.com/users/", userItem)
      .then(() => getUsers())
      .catch((error) => console.log(error.response));
  };

  const removeUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
  };

  const selectUser = (user) => {
    setUserSelected(user);
  };

  const unselectUser = () => setUserSelected(null);

  const editUser = (userEdited) => {
    axios
      .put(
        `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
        userEdited
      )
      .then(() => getUsers());
  };

  // const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      {/* <button onClick={() => setShowModal(true)}>Open modal</button>
        {showModal && <Modal close={() => setShowModal(false)} />} */}

      <UsersForm
        addUser={addUser}
        userSelected={userSelected}
        unselectUser={unselectUser}
        editUser={editUser}
      />
      <UsersList user={user} removeUser={removeUser} selectUser={selectUser} />
    </div>
  );
}

export default App;
