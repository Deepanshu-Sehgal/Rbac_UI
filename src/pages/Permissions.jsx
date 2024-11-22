import React from 'react';
import { useSelector } from 'react-redux';

const Permissions = () => {
  const permissions = useSelector((state) => state.permissions);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">View Permissions</h1>
      {permissions.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2">
          {permissions.map((permission, index) => (
            <li key={index} className="text-lg text-gray-700">
              {permission}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No permissions available.</p>
      )}
    </div>
  );
};

export default Permissions;
