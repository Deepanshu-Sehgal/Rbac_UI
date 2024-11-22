import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, toggleStatus } from '../Features/UserSlice'; 
import AddEditUser from '../Components/AddEditUser';

const User = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null);

  const handleToggleStatus = (userId) => {
    dispatch(toggleStatus(userId));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Add/Edit User Form */}
      <AddEditUser editingUser={editingUser} setEditingUser={setEditingUser} />

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.role || 'No Role Assigned'}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`px-3 py-1 rounded-md ${
                        user.status === 'Active'
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
