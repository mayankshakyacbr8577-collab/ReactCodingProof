import React, { useEffect, useState } from "react";

const FetchCRUD = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    address: "",
  });
  const addUser = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const getQuotes = async () => {
    const data = await fetch("http://localhost:5000/users");
    const jsonData = await data.json();
    setUsers(await jsonData);
  };
  const updateUser = () => {
    fetch(`http://localhost:5000/users/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => alert(error.message));
    alert("User Updated!");
  };
  const deleteUser = () => {
    fetch(`http://localhost:5000/users/${userData.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => alert(error.message));
    alert("User Deleted!");
  };
  const insertUser = () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => alert(error.message));
    alert("User Inserted!");
  };
  useEffect(() => {
    getQuotes();
  }, []);
  return (
    <div className="container d-flex flex-column justify-contents-center align-items-center">
      <h2 className="text-center">User Information</h2>
      <form
        className="d-flex flex-column gap-2 bg-success border border-2 rounded-2 p-3
      justify-contents-center align-items-center"
      >
        <input
          type="text"
          name="id"
          placeholder="Enter user id"
          value={userData.id}
          onChange={addUser}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter user name"
          value={userData.name}
          onChange={addUser}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter user address"
          value={userData.address}
          onChange={addUser}
        />
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={insertUser}>
            Insert
          </button>
          <button className="btn btn-primary" onClick={updateUser}>
            Update
          </button>
          <button className="btn btn-primary" onClick={deleteUser}>Delete</button>
        </div>
      </form>
      <h2>List of Users</h2>
      <table className="table table-dark">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody className="table-warning">
          {users.map((row) => (
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchCRUD;
