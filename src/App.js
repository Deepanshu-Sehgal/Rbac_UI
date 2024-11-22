import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar';
import Dashboard from './pages/DashBoard';
import Users from './pages/User';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
