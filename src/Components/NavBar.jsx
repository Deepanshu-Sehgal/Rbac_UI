import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-lg font-semibold">
          RBAC System
        </Link>
        <div className="flex space-x-4">
          <Link to="/users" className="hover:text-gray-400">Users</Link>
          <Link to="/roles" className="hover:text-gray-400">Roles</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
