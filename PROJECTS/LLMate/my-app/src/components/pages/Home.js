

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaFilter } from "react-icons/fa";
import { Modal, Button, Form } from 'react-bootstrap';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([
        { title: "Add", key: "add" },
        { title: "PRODUCT LINK", key: "website" },
        { title: "NAME", key: "username" },
        { title: "INGREDIENTS", key: "name" },
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
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterColumn, setFilterColumn] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState("");
    const [filterType, setFilterType] = useState("text");
    const [filters, setFilters] = useState({});

    const inputRef = useRef(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:3003/users");
            setUsers(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
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
        setEditingValue(users[rowIndex][columnKey] || ""); // Ensure field has a default value
        inputRef.current?.focus(); // Focus input if available
    };

    const handleSaveEdit = async (rowIndex, columnKey) => {
        try {
            const updatedUser = { ...users[rowIndex], [columnKey]: editingValue };
            await axios.put(`http://localhost:3003/users/${users[rowIndex].id}`, updatedUser);
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

    const handleFilterClick = (column) => {
        setFilterColumn(column);
        setFilterType(column.type || "text");
        setShowFilterModal(true);
    };

    const applyFilter = () => {
        setFilters({
            ...filters,
            [filterColumn.key]: {
                type: filterType,
                criteria: filterCriteria
            }
        });
        setShowFilterModal(false);
    };

    const resetFilters = () => {
        setFilters({});
    };

    const filteredUsers = users.filter(user => {
        return Object.keys(filters).every(key => {
            const filter = filters[key];
            if (filter.type === "text") {
                return user[key]?.toString().includes(filter.criteria);
            } else if (filter.type === "number") {
                const number = parseFloat(user[key]);
                const criteria = parseFloat(filter.criteria);
                if (isNaN(number) || isNaN(criteria)) return true; // If not a number, skip filter
                return filter.criteria.includes(">") ? number > criteria : number < criteria;
            }
            return true;
        });
    });

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingCell]);

    return (
        <div className="container">
            <div className="py-4">
                <h1>
                    Project - LLMate
                    <img 
                        src="https://llmate.ai/images/logo.png" 
                        style={{ width: "300px", height: "80px", verticalAlign: "middle", marginLeft: "25px" }} 
                    />
                </h1>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-card">
                            <div className="card-body">
                                <h3 className="card-title">Add New Product</h3>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="PRODUCT LINK"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="NAME"
                                        value={newUser.username}
                                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control mb-2"
                                        placeholder="INGREDIENTS"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="PRICE"
                                        value={newUser.lng}
                                        onChange={(e) => setNewUser({ ...newUser, lng: e.target.value })}
                                    />
                                </div>
                                <button className="btn btn-outline-light" onClick={addNewUser}>
                                    Add 
                                </button>
                            </div>
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
                                            className="btn btn-outline-light"
                                            onClick={() => setShowForm(!showForm)}
                                        >
                                            +
                                        </button>
                                    ) : (
                                        <>
                                            {column.title}
                                            {column.key !== "add" && (
                                                <FaFilter
                                                    className="text-light"
                                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                                    onClick={() => handleFilterClick(column)}
                                                />
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                            <th scope="col">
                                <button className="btn btn-dark" onClick={handleAddColumn}>+ ADD NEW COLUMN</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, rowIndex) => (
                            <tr key={user.id}>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        onClick={() => column.key !== "add" && handleEditCell(rowIndex, column.key)}
                                    >
                                        {editingCell?.rowIndex === rowIndex && editingCell?.columnKey === column.key ? (
                                            <input
                                                ref={inputRef}
                                                type={column.type || "text"}
                                                value={editingValue}
                                                onChange={handleInputChange}
                                                onKeyPress={(e) => handleKeyPress(e, rowIndex, column.key)}
                                                onBlur={() => handleBlur(rowIndex, column.key)}
                                                className="form-control"
                                            />
                                        ) : (
                                            user[column.key]
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

                <Modal show={showColumnModal} onHide={() => setShowColumnModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Column</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formColumnName">
                            <Form.Label>Column Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formColumnType">
                            <Form.Label>Column Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={newColumnType}
                                onChange={(e) => setNewColumnType(e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowColumnModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCreateColumn}>
                            Add Column
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter {filterColumn?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formFilterCriteria">
                            <Form.Label>Filter Criteria</Form.Label>
                            <Form.Control
                                type={filterType}
                                value={filterCriteria}
                                onChange={(e) => setFilterCriteria(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={applyFilter}>
                            Apply Filter
                        </Button>
                        <Button variant="danger" onClick={resetFilters}>
                            Reset All
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this user?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Home;


















