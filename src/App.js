import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:5000/users/${currentUserId}`, { name, email });
      setEditing(false);
      setCurrentUserId(null);
    } else {
      await axios.post('http://localhost:5000/users', { name, email });
    }
    setName('');
    setEmail('');
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUserId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="bg-blue-600 w-full text-white py-4 text-center">
        <h1 className="text-2xl font-bold">User Management</h1>
      </header>
      <main className="flex flex-col items-center mt-8 w-full max-w-lg">
        <form className="bg-white p-6 rounded-lg shadow-lg w-full" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit User' : 'Add User'}</h2>
          <div className="form-group mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 border rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h1 >additional changes</h1>
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
            {editing ? 'Update User' : 'Add User'}
          </button>
        </form>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full mt-6">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <ul>
            {users.map(user => (
              <li key={user._id} className="flex justify-between items-center py-2">
                <div>
                  <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="bg-blue-600 w-full text-white py-2 text-center mt-auto">
        <p>&copy; 2024 User Management System</p>
      </footer>
    </div>
  );
}

export default App;
