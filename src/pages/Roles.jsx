import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRole, editRole, deleteRole } from '../Features/rolesSlice';

const Roles = () => {
  const [form, setForm] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const roles = useSelector((state) => state.roles);
  const permissions = useSelector((state) => state.permissions);
  const dispatch = useDispatch();


  useEffect(() => {
    if (editingRole) {
      setForm(editingRole);
    }
  }, [editingRole]);

  const handleTogglePermission = (permission) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      dispatch(editRole(form));
    } else {
      dispatch(addRole({ ...form, id: Date.now() }));
    }
    setForm({ name: '', permissions: [] });
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch(deleteRole(roleId));
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Roles</h1>

      {/* Add/Edit Role Form */}
      <form className="space-y-4 bg-gray-100 p-4 rounded-md shadow-md mb-8" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">{editingRole ? 'Edit Role' : 'Add Role'}</h2>
        <input
          type="text"
          placeholder="Role Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
        <div>
          <h3 className="font-semibold mb-2">Permissions</h3>
          <div className="flex flex-wrap gap-4">
            {permissions.map((permission) => (
              <label
                key={permission}
                className="flex items-center gap-2 bg-white px-3 py-2 border rounded-md shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={form.permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                  className="h-4 w-4"
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white ${
            editingRole ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {editingRole ? 'Update Role' : 'Add Role'}
        </button>
      </form>

      {/* Roles Table */}
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
                      onClick={() => setEditingRole(role)}
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
  );
};

export default Roles;
