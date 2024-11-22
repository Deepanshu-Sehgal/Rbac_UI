import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRole, editRole } from '../Features/rolesSlice';

const AddEditRole = ({ editingRole, setEditingRole }) => {
  const [form, setForm] = useState({ name: '', permissions: [] });
  const permissions = useSelector((state) => state.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingRole) setForm(editingRole);
  }, [editingRole]);

  const togglePermission = (permission) => {
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

  return (
    <form className="space-y-4 bg-gray-100 p-4 rounded-md shadow-md" onSubmit={handleSubmit}>
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
                onChange={() => togglePermission(permission)}
                className="h-4 w-4"
              />
              <span>{permission}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
        {editingRole ? 'Update Role' : 'Add Role'}
      </button>
    </form>
  );
};

export default AddEditRole;
