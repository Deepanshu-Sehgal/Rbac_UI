import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleStatus } from '../Features/UserSlice';
import { deleteRole } from '../Features/rolesSlice';

const Dashboard = () => {
  const users = useSelector((state) => state.users);
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  // Helper function to get permissions for a role
  const getPermissionsForRole = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    return role?.permissions || [];
  };

  const handleToggleStatus = (userId) => {
    dispatch(toggleStatus(userId));
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch(deleteRole(roleId));
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-4xl font-bold">{users.length}</p>
        </div>

        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Roles</h2>
          <p className="text-4xl font-bold">{roles.length}</p>
        </div>

        <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Permissions</h2>
          <p className="text-4xl font-bold">
            {roles.reduce((acc, role) => acc + (role.permissions?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Users with Roles, Permissions, and Status */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Users with Roles, Permissions, and Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Role</th>
                <th className="border border-gray-300 p-2">Permissions</th>
                <th className="border border-gray-300 p-2">Status</th>
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
                      {user.role
                        ? getPermissionsForRole(user.role).join(', ')
                        : 'No Permissions'}
                    </td>
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

      {/* Manage Roles Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Manage Roles</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Role Name</th>
                <th className="border border-gray-300 p-2">Permissions</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{role.name}</td>
                    <td className="border border-gray-300 p-2">
                      {role.permissions?.join(', ') || 'No Permissions'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
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
                    colSpan="3"
                    className="border border-gray-300 p-4 text-center text-gray-500"
                  >
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/users"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Manage Users
          </Link>
          <Link
            to="/roles"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Manage Roles
          </Link>
          <Link
            to="/permissions"
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            View Permissions
          </Link>
          <Link
            to="/users"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Add User
          </Link>
          <Link
            to="/roles"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Add Role
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
