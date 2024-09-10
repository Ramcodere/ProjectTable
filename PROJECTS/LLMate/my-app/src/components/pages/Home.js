
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing icons for trash and edit

// const Home = () => {
//     const [users, setUsers] = useState([]);
//     const [columns, setColumns] = useState([
//         { title: "Add", key: "add" }, // This is where the "+" icon will be
//         { title: "PRODUCT LINK", key: "name" },
//         { title: "NAME", key: "username" },
//         { title: "INGREDIENTS", key: "email" }, // We'll make this editable
//         { title: "PRICE", key: "lng" },
//     ]);
//     const [newUser, setNewUser] = useState({
//         name: "",
//         username: "",
//         email: "",
//         lng: "",
//     });
//     const [editIndex, setEditIndex] = useState(null); // To track which row is being edited
//     const [editValue, setEditValue] = useState("");   // To store the updated value for the email
//     const [showForm, setShowForm] = useState(false);  // State to control form visibility

//     useEffect(() => {
//         loadUsers();
//     }, []);

//     const loadUsers = async () => {
//         const result = await axios.get("http://localhost:3003/users");
//         setUsers(result.data);
//     };

//           const addNewUser = async () => {
//         try {
//             const result = await axios.post("http://localhost:3003/users", newUser);
//             setUsers([...users, result.data]);
//             setNewUser({
//                 name: "",
//                 username: "",
//                 email: "",
//                 lng: "",
//             }); 
//             setShowForm(false); 
//         } catch (error) {
//             console.error("There was an error adding the user!", error);
//         }
//     };

//     const addColumn = () => {
//         const newColumn = {
//             title: `New Column ${columns.length + 1}`,
//             key: `newColumn${columns.length + 1}`,
//         };
//         setColumns([...columns, newColumn]);
//     };

   


  

// const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) {
//         return; // If the user cancels the action, exit the function
//     }
    
//     console.log("Deleting user with ID:", userId); 
    
//     try {
//         const response = await axios.delete(`http://localhost:3003/users/${userId}`);
//         console.log("Response:", response); 
        
//         if (response.status === 200 || response.status === 204) {
//             const updatedUsers = users.filter((user) => user.id !== userId);
//             setUsers(updatedUsers);
//         } else {
//             console.error("Unexpected response status:", response.status);
//         }
//     } catch (error) {
//         console.error("There was an error deleting the user!", error);
//     }
// };

    
  

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setEditValue(users[index].email); 
//     };

//     const saveEdit = async (index) => {
//         try {
//             const updatedUser = { ...users[index], email: editValue };
//             await axios.put(`http://localhost:3003/users/${users[index]._id}`, updatedUser);
//             const updatedUsers = [...users];
//             updatedUsers[index] = updatedUser;
//             setUsers(updatedUsers);
//             setEditIndex(null);
//         } catch (error) {
//             console.error("There was an error updating the user!", error);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="py-4">
//                 <h1>Project - LLMate</h1>

//                 {showForm && (
//                     <div className="card mb-4">
//                         <div className="card-body">
//                             <h3 className="card-title">Add New User</h3>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Name"
//                                     value={newUser.name}
//                                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Username"
//                                     value={newUser.username}
//                                     onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="email"
//                                     className="form-control mb-2"
//                                     placeholder="Email"
//                                     value={newUser.email}
//                                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Price"
//                                     value={newUser.lng}
//                                     onChange={(e) => setNewUser({ ...newUser, lng: e.target.value })}
//                                 />
//                             </div>
//                             <button className="btn btn-outline-success" onClick={addNewUser}>
//                                 Add User
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <table className="table table-dark table-bordered border shadow">
//                     <thead>
//                         <tr>
//                             {columns.map((column, index) => (
//                                 <th scope="col" key={index}>
//                                     {column.key === "add" ? (
//                                         <button
//                                             className="btn btn-outline-success"
//                                             onClick={() => setShowForm(!showForm)}
//                                         >
//                                             +
//                                         </button>
//                                     ) : (
//                                         column.title
//                                     )}
//                                 </th>
//                             ))}
//                             <th scope="col">
//                                 <button className="btn btn-dark" onClick={addColumn}>+ ADD NEW COLUMN</button>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Array.isArray(users) && users.map((user, index) => (
//                             <tr key={index}>
//                                 {columns.map((column, colIndex) => (
//                                     <td key={colIndex}>
//                                         {column.key === "email" && editIndex === index ? (
//                                             <>
//                                                 <input
//                                                     type="text"
//                                                     value={editValue}
//                                                     onChange={(e) => setEditValue(e.target.value)}
//                                                 />
//                                                 <button
//                                                     className="btn btn-outline-primary"
//                                                     onClick={() => saveEdit(index)}
//                                                 >
//                                                     Save
//                                                 </button>
//                                             </>
//                                         ) : column.key === "email" ? (
//                                             <>
//                                                 <span>{user[column.key]}</span>
//                                                 <FaEdit
//                                                     style={{ cursor: "pointer", marginLeft: "10px" }}
//                                                     onClick={() => handleEdit(index)}
//                                                 />
//                                             </>
//                                         ) : (
//                                             user[column.key]
//                                         )}
//                                     </td>
//                                 ))}
//                                 <td>
//                                     <FaTrashAlt
//                                         className="text-light"
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => handleDelete(user.id)}

//                                     />
//                                 </td> 
                                 
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Home;


//---------------------------------------------------------------------------------------------------


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing icons for trash and edit
// import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

// const Home = () => {
//     const [users, setUsers] = useState([]);
//     const [columns, setColumns] = useState([
//         { title: "Add", key: "add" },
//         { title: "PRODUCT LINK", key: "name" },
//         { title: "NAME", key: "username" },
//         { title: "INGREDIENTS", key: "email" },
//         { title: "PRICE", key: "lng" },
//     ]);
//     const [newUser, setNewUser] = useState({
//         name: "",
//         username: "",
//         email: "",
//         lng: "",
//     });
//     const [editIndex, setEditIndex] = useState(null);
//     const [editValue, setEditValue] = useState("");
//     const [showForm, setShowForm] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing the delete confirmation modal
//     const [userIdToDelete, setUserIdToDelete] = useState(null); // State to track the user ID to delete

//     useEffect(() => {
//         loadUsers();
//     }, []);

//     const loadUsers = async () => {
//         const result = await axios.get("http://localhost:3003/users");
//         setUsers(result.data);
//     };

//     const addNewUser = async () => {
//         try {
//             const result = await axios.post("http://localhost:3003/users", newUser);
//             setUsers([...users, result.data]);
//             setNewUser({
//                 name: "",
//                 username: "",
//                 email: "",
//                 lng: "",
//             });
//             setShowForm(false);
//         } catch (error) {
//             console.error("There was an error adding the user!", error);
//         }
//     };

//     const addColumn = () => {
//         const newColumn = {
//             title: `New Column ${columns.length + 1}`,
//             key: `newColumn${columns.length + 1}`,
//         };
//         setColumns([...columns, newColumn]);
//     };

//     // Show delete confirmation modal
//     const handleDeleteClick = (userId) => {
//         setUserIdToDelete(userId);
//         setShowDeleteModal(true); // Show the modal when user clicks the delete icon
//     };

//     // Handle deletion after confirmation
//     const handleDeleteConfirm = async () => {
//         try {
//             await axios.delete(`http://localhost:3003/users/${userIdToDelete}`);
//             const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
//             setUsers(updatedUsers);
//             setShowDeleteModal(false); // Close the modal after deletion
//         } catch (error) {
//             console.error("There was an error deleting the user!", error);
//         }
//     };

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setEditValue(users[index].email);
//     };

//     const saveEdit = async (index) => {
//         try {
//             const updatedUser = { ...users[index], email: editValue };
//             await axios.put(`http://localhost:3003/users/${users[index]._id}`, updatedUser);
//             const updatedUsers = [...users];
//             updatedUsers[index] = updatedUser;
//             setUsers(updatedUsers);
//             setEditIndex(null);
//         } catch (error) {
//             console.error("There was an error updating the user!", error);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="py-4">
//                 <h1>Project - LLMate</h1>

//                 {showForm && (
//                     <div className="card mb-4">
//                         <div className="card-body">
//                             <h3 className="card-title">Add New User</h3>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Name"
//                                     value={newUser.name}
//                                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Username"
//                                     value={newUser.username}
//                                     onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="email"
//                                     className="form-control mb-2"
//                                     placeholder="Email"
//                                     value={newUser.email}
//                                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Price"
//                                     value={newUser.lng}
//                                     onChange={(e) => setNewUser({ ...newUser, lng: e.target.value })}
//                                 />
//                             </div>
//                             <button className="btn btn-outline-success" onClick={addNewUser}>
//                                 Add User
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <table className="table table-dark table-bordered border shadow">
//                     <thead>
//                         <tr>
//                             {columns.map((column, index) => (
//                                 <th scope="col" key={index}>
//                                     {column.key === "add" ? (
//                                         <button
//                                             className="btn btn-outline-success"
//                                             onClick={() => setShowForm(!showForm)}
//                                         >
//                                             +
//                                         </button>
//                                     ) : (
//                                         column.title
//                                     )}
//                                 </th>
//                             ))}
//                             <th scope="col">
//                                 <button className="btn btn-dark" onClick={addColumn}>+ ADD NEW COLUMN</button>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Array.isArray(users) && users.map((user, index) => (
//                             <tr key={index}>
//                                 {columns.map((column, colIndex) => (
//                                     <td key={colIndex}>
//                                         {column.key === "email" && editIndex === index ? (
//                                             <>
//                                                 <input
//                                                     type="text"
//                                                     value={editValue}
//                                                     onChange={(e) => setEditValue(e.target.value)}
//                                                 />
//                                                 <button
//                                                     className="btn btn-outline-primary"
//                                                     onClick={() => saveEdit(index)}
//                                                 >
//                                                     Save
//                                                 </button>
//                                             </>
//                                         ) : column.key === "email" ? (
//                                             <>
//                                                 <span>{user[column.key]}</span>
//                                                 <FaEdit
//                                                     style={{ cursor: "pointer", marginLeft: "10px" }}
//                                                     onClick={() => handleEdit(index)}
//                                                 />
//                                             </>
//                                         ) : (
//                                             user[column.key]
//                                         )}
//                                     </td>
//                                 ))}
//                                 <td>
//                                     <FaTrashAlt
//                                         className="text-light"
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => handleDeleteClick(user.id)} // Call the delete confirmation modal
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Delete Confirmation Modal */}
//             <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to delete this row? This action cannot be undone.
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//                         No
//                     </Button>
//                     <Button variant="danger" onClick={handleDeleteConfirm}>
//                         Yes, Confirm
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Home;




//-------------------------------------------------------------------


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import { Modal, Button, Form } from 'react-bootstrap';

// const Home = () => {
//     const [users, setUsers] = useState([]);
//     const [columns, setColumns] = useState([
//         { title: "Add", key: "add" },
//         { title: "PRODUCT LINK", key: "website" },
//         { title: "NAME", key: "username" },
//         { title: "INGREDIENTS", key: "city" },
//         { title: "PRICE", key: "lng" },
//     ]);
//     const [newUser, setNewUser] = useState({
//         name: "",
//         username: "",
//         email: "",
//         lng: "",
//     });
//     const [editingCell, setEditingCell] = useState(null); // Track which cell is being edited
//     const [editingValue, setEditingValue] = useState("");
//     const [showForm, setShowForm] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [userIdToDelete, setUserIdToDelete] = useState(null);
//     const [showColumnModal, setShowColumnModal] = useState(false);
//     const [newColumnName, setNewColumnName] = useState("");
//     const [newColumnType, setNewColumnType] = useState("text");

//     const inputRef = useRef(null); // Reference for the input field

//     useEffect(() => {
//         loadUsers();
//     }, []);

//     const loadUsers = async () => {
//         const result = await axios.get("http://localhost:3003/users");
//         setUsers(result.data);
//     };

//     const addNewUser = async () => {
//         try {
//             const result = await axios.post("http://localhost:3003/users", newUser);
//             setUsers([...users, result.data]);
//             setNewUser({
//                 name: "",
//                 username: "",
//                 email: "",
//                 lng: "",
//             });
//             setShowForm(false);
//         } catch (error) {
//             console.error("There was an error adding the user!", error);
//         }
//     };

//     const handleDeleteClick = (userId) => {
//         setUserIdToDelete(userId);
//         setShowDeleteModal(true);
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             await axios.delete(`http://localhost:3003/users/${userIdToDelete}`);
//             const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
//             setUsers(updatedUsers);
//             setShowDeleteModal(false);
//         } catch (error) {
//             console.error("There was an error deleting the user!", error);
//         }
//     };

//     const handleEditCell = (rowIndex, columnKey) => {
//         setEditingCell({ rowIndex, columnKey });
//         setEditingValue(users[rowIndex][columnKey]);
//     };

//     const handleSaveEdit = async (rowIndex, columnKey) => {
//         try {
//             const updatedUser = { ...users[rowIndex], [columnKey]: editingValue };
//             await axios.put(`http://localhost:3003/users/${users[rowIndex]._id}`, updatedUser);
//             const updatedUsers = [...users];
//             updatedUsers[rowIndex] = updatedUser;
//             setUsers(updatedUsers);
//             setEditingCell(null);
//         } catch (error) {
//             console.error("There was an error updating the user!", error);
//         }
//     };

//     const handleInputChange = (e) => {
//         setEditingValue(e.target.value);
//     };

//     const handleKeyPress = (e, rowIndex, columnKey) => {
//         if (e.key === "Enter") {
//             handleSaveEdit(rowIndex, columnKey);
//         }
//     };

//     const handleBlur = (rowIndex, columnKey) => {
//         handleSaveEdit(rowIndex, columnKey);
//     };

//     const handleAddColumn = () => {
//         setShowColumnModal(true);
//     };

//     const handleCreateColumn = () => {
//         if (newColumnName) {
//             const newColumn = {
//                 title: newColumnName,
//                 key: newColumnName.toLowerCase(),
//                 type: newColumnType
//             };
//             setColumns([...columns, newColumn]);
//             setShowColumnModal(false);
//             setNewColumnName("");
//             setNewColumnType("text");
//         }
//     };

//     useEffect(() => {
//         if (inputRef.current) {
//             inputRef.current.focus();
//         }
//     }, [editingCell]);

//     return (
//         <div className="container">
//             <div className="py-4">
//                 <h1>Project - LLMate</h1>

//                 {showForm && (
//                     <div className="card mb-4">
//                         <div className="card-body">
//                             <h3 className="card-title">Add New User</h3>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Name"
//                                     value={newUser.name}
//                                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Username"
//                                     value={newUser.username}
//                                     onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="email"
//                                     className="form-control mb-2"
//                                     placeholder="Email"
//                                     value={newUser.email}
//                                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Price"
//                                     value={newUser.lng}
//                                     onChange={(e) => setNewUser({ ...newUser, lng: e.target.value })}
//                                 />
//                             </div>
//                             <button className="btn btn-outline-success" onClick={addNewUser}>
//                                 Add User
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <table className="table table-dark table-bordered border shadow">
//                     <thead>
//                         <tr>
//                             {columns.map((column, index) => (
//                                 <th scope="col" key={index}>
//                                     {column.key === "add" ? (
//                                         <button
//                                             className="btn btn-outline-success"
//                                             onClick={() => setShowForm(!showForm)}
//                                         >
//                                             +
//                                         </button>
//                                     ) : (
//                                         column.title
//                                     )}
//                                 </th>
//                             ))}
//                             <th scope="col">
//                                 <button className="btn btn-dark" onClick={handleAddColumn}>+ ADD NEW COLUMN</button>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Array.isArray(users) && users.map((user, rowIndex) => (
//                             <tr key={rowIndex}>
//                                 {columns.map((column, colIndex) => (
//                                     <td
//                                         key={colIndex}
//                                         onClick={() => handleEditCell(rowIndex, column.key)}
//                                     >
//                                         {editingCell && editingCell.rowIndex === rowIndex && editingCell.columnKey === column.key ? (
//                                             <input
//                                                 ref={inputRef}
//                                                 type={column.type || "text"}
//                                                 value={editingValue}
//                                                 onChange={handleInputChange}
//                                                 onKeyPress={(e) => handleKeyPress(e, rowIndex, column.key)}
//                                                 onBlur={() => handleBlur(rowIndex, column.key)}
//                                                 autoFocus
//                                             />
//                                         ) : (
//                                             <>
//                                                 <span>{user[column.key]}</span>
//                                                 {column.key === "email" && (
//                                                     <FaEdit
//                                                         style={{ cursor: "pointer", marginLeft: "10px" }}
//                                                         onClick={() => handleEditCell(rowIndex, column.key)}
//                                                     />
//                                                 )}
//                                             </>
//                                         )}
//                                     </td>
//                                 ))}
//                                 <td>
//                                     <FaTrashAlt
//                                         className="text-light"
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => handleDeleteClick(user.id)}
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Delete Confirmation Modal */}
//             <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to delete this row? This action cannot be undone.
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//                         No
//                     </Button>
//                     <Button variant="danger" onClick={handleDeleteConfirm}>
//                         Yes, Confirm
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Create New Column Modal */}
//             <Modal show={showColumnModal} onHide={() => setShowColumnModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create New Column</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Field Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter column name"
//                                 value={newColumnName}
//                                 onChange={(e) => setNewColumnName(e.target.value)}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Field Type</Form.Label>
//                             <Form.Select
//                                 value={newColumnType}
//                                 onChange={(e) => setNewColumnType(e.target.value)}
//                             >
//                                 <option value="text">Text</option>
//                                 <option value="number">Number</option>
//                                 <option value="date">Date</option>
//                             </Form.Select>
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowColumnModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleCreateColumn}>
//                         Create
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Home;

//------------------------------------------------------------------


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Modal, Button, Form } from 'react-bootstrap';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([
        { title: "Add", key: "add" },
        { title: "PRODUCT LINK", key: "name" },
        { title: "NAME", key: "username" },
        { title: "INGREDIENTS", key: "email" },
        { title: "PRICE", key: "lng" },
    ]);
    const [newUser, setNewUser] = useState({
        name: "",
        username: "",
        email: "",
        lng: "",
    });
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [showColumnModal, setShowColumnModal] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [newColumnType, setNewColumnType] = useState("text");

    const inputRef = useRef(null);

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

    const handleDeleteClick = (userId) => {
        setUserIdToDelete(userId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3003/users/${userIdToDelete}`);
            const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
            setUsers(updatedUsers);
            setShowDeleteModal(false);
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    const handleEditCell = (rowIndex, columnKey) => {
        setEditingCell({ rowIndex, columnKey });
        setEditingValue(users[rowIndex][columnKey]);
    };

    const handleSaveEdit = async (rowIndex, columnKey) => {
        try {
            const updatedUser = { ...users[rowIndex], [columnKey]: editingValue };
            await axios.put(`http://localhost:3003/users/${users[rowIndex]._id}`, updatedUser);
            const updatedUsers = [...users];
            updatedUsers[rowIndex] = updatedUser;
            setUsers(updatedUsers);
            setEditingCell(null);
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };

    const handleInputChange = (e) => {
        setEditingValue(e.target.value);
    };

    const handleKeyPress = (e, rowIndex, columnKey) => {
        if (e.key === "Enter") {
            handleSaveEdit(rowIndex, columnKey);
        }
    };

    const handleBlur = (rowIndex, columnKey) => {
        handleSaveEdit(rowIndex, columnKey);
    };

    const handleAddColumn = () => {
        setShowColumnModal(true);
    };

    const handleCreateColumn = () => {
        if (newColumnName) {
            const newColumn = {
                title: newColumnName,
                key: newColumnName.toLowerCase(),
                type: newColumnType
            };
            setColumns([...columns, newColumn]);
            setShowColumnModal(false);
            setNewColumnName("");
            setNewColumnType("text");
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingCell]);

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
                                <button className="btn btn-dark" onClick={handleAddColumn}>+ ADD NEW COLUMN</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.map((user, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        onClick={() => column.key !== "email" && handleEditCell(rowIndex, column.key)} // Make cells clickable only if they are not "email"
                                    >
                                        {editingCell && editingCell.rowIndex === rowIndex && editingCell.columnKey === column.key ? (
                                            <input
                                                ref={inputRef}
                                                type={column.type || "text"}
                                                value={editingValue}
                                                onChange={handleInputChange}
                                                onKeyPress={(e) => handleKeyPress(e, rowIndex, column.key)}
                                                onBlur={() => handleBlur(rowIndex, column.key)}
                                                autoFocus
                                            />
                                        ) : (
                                            <>
                                                <span>{user[column.key]}</span>
                                                {column.key === "" && ( // Show edit icon only for "email" column
                                                    <FaEdit
                                                        style={{ cursor: "pointer", marginLeft: "10px" }}
                                                        onClick={() => handleEditCell(rowIndex, column.key)}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <FaTrashAlt
                                        className="text-light"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDeleteClick(user.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this row? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Yes, Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create New Column Modal */}
            <Modal show={showColumnModal} onHide={() => setShowColumnModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Column</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Field Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter column name"
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Field Type</Form.Label>
                            <Form.Select
                                value={newColumnType}
                                onChange={(e) => setNewColumnType(e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowColumnModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateColumn}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;


//-----------------------------------------------------------------------





