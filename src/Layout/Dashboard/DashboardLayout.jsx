import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import ProfastLogo from '../../Component/Shared/ProfestLogo/ProfestLogo';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaSearchLocation, FaUserEdit } from 'react-icons/fa';
const DashboardLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
       <div className="min-h-screen container mx-auto flex flex-col lg:flex-row">
      {/* Sidebar / Navbar */}
      <div className={`lg:w-1/4 w-full bg-black shadow-md z-20 ${drawerOpen ? 'block' : 'hidden'} lg:block`}>
      
        <div className="p-4 border-b flex justify-between items-center lg:hidden">
        
          <h2 className="text-xl font-semibold">Dashboard Menu</h2>
          <button onClick={toggleDrawer} className="btn btn-sm">Close</button>
        </div>
        <ul className="menu p-4  space-y-2">
            <ProfastLogo></ProfastLogo>
            <li>
    <NavLink to="/" className="flex items-center gap-2">
      <FaHome /> Home
    </NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/myParcels" className="flex items-center gap-2">
      <FaBoxOpen /> My Parcels
    </NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/payment-history" className="flex items-center gap-2">
      <FaMoneyCheckAlt /> Payment History
    </NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/myParcels" className="flex items-center gap-2">
      <FaSearchLocation /> Track a Package
    </NavLink>
  </li>
  <li>
    <NavLink to="/dashboard/myParcels" className="flex items-center gap-2">
      <FaUserEdit /> Update Profile
    </NavLink>
  </li>
          
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
        {/* Top bar for small devices */}
        <div className="lg:hidden mb-4">
          <button onClick={toggleDrawer} className="btn btn-outline btn-sm flex items-center gap-2">
            <FaBars /> Menu
          </button>
        </div>

        {/* Main Outlet for Page Content */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
    );
};

export default DashboardLayout;