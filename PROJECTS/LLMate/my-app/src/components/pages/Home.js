
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing icons for trash and edit

const Home = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([
        { title: "Add", key: "add" }, // This is where the "+" icon will be
        { title: "PRODUCT LINK", key: "name" },
        { title: "NAME", key: "username" },
        { title: "INGREDIENTS", key: "email" }, // We'll make this editable
        { title: "PRICE", key: "lng" },
    ]);
    const [newUser, setNewUser] = useState({
        name: "",
        username: "",
        email: "",
        lng: "",
    });
    const [editIndex, setEditIndex] = useState(null); // To track which row is being edited
    const [editValue, setEditValue] = useState("");   // To store the updated value for the email
    const [showForm, setShowForm] = useState(false);  // State to control form visibility

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUsers(result.data);
    };

          const addNewUser = async () => {
        try {
            const result = await axios.post("http://localhost:3003/users", newUser);
            setUsers([...users, result.data]);
            setNewUser({
                name: "",
                username: "",
                email: "",
                lng: "",
            }); 
            setShowForm(false); 
        } catch (error) {
            console.error("There was an error adding the user!", error);
        }
    };

    const addColumn = () => {
        const newColumn = {
            title: `New Column ${columns.length + 1}`,
            key: `newColumn${columns.length + 1}`,
        };
        setColumns([...columns, newColumn]);
    };

   

    const handleDelete = async (userId) => {
      console.log("Deleting user with ID:", userId); 
      
      try {
          const response = await axios.delete(`http://localhost:3003/users/${userId}`);
          console.log("Response:", response); 
          
          if (response.status === 200 || response.status === 204) {
              const updatedUsers = users.filter((user) => user.id !== userId);
              setUsers(updatedUsers);
          } else {
              console.error("Unexpected response status:", response.status);
          }
      } catch (error) {
          console.error("There was an error deleting the user!", error);
      }
  };
  
    
  

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(users[index].email); 
    };

    const saveEdit = async (index) => {
        try {
            const updatedUser = { ...users[index], email: editValue };
            await axios.put(`http://localhost:3003/users/${users[index]._id}`, updatedUser);
            const updatedUsers = [...users];
            updatedUsers[index] = updatedUser;
            setUsers(updatedUsers);
            setEditIndex(null);
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };

    return (
        <div className="container">
            <div className="py-4">
                <h1>Project - LLMate</h1>

                {showForm && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Add New User</h3>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Username"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Price"
                                    value={newUser.lng}
                                    onChange={(e) => setNewUser({ ...newUser, lng: e.target.value })}
                                />
                            </div>
                            <button className="btn btn-outline-success" onClick={addNewUser}>
                                Add User
                            </button>
                        </div>
                    </div>
                )}

                <table className="table table-dark table-bordered border shadow">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th scope="col" key={index}>
                                    {column.key === "add" ? (
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => setShowForm(!showForm)}
                                        >
                                            +
                                        </button>
                                    ) : (
                                        column.title
                                    )}
                                </th>
                            ))}
                            <th scope="col">
                                <button className="btn btn-dark" onClick={addColumn}>+ ADD NEW COLUMN</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.map((user, index) => (
                            <tr key={index}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>
                                        {column.key === "email" && editIndex === index ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                />
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() => saveEdit(index)}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : column.key === "email" ? (
                                            <>
                                                <span>{user[column.key]}</span>
                                                <FaEdit
                                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                                    onClick={() => handleEdit(index)}
                                                />
                                            </>
                                        ) : (
                                            user[column.key]
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <FaTrashAlt
                                        className="text-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDelete(user.id)}

                                    />
                                </td> 
                                 
    




                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;






