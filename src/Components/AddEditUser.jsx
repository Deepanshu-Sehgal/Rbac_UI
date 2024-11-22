import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser } from '../Features/UserSlice';

const AddEditUser = ({ editingUser, setEditingUser }) => {
  const [form, setForm] = useState({ name: '', email: '', role: '', status: 'Active' });
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingUser) setForm(editingUser);
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(editUser(form));
    } else {
      dispatch(addUser({ ...form, id: Date.now() }));
    }
    setForm({ name: '', email: '', role: '', status: 'Active' });
    setEditingUser(null);
  };

  return (
    <form className="space-y-4 bg-gray-100 p-4 rounded-md shadow-md" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full"
        required
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border border-gray-300 p-2 rounded-md w-full"
      >
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {editingUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default AddEditUser;
