import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';

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
          <li><Link to="/dashboard">Overview</Link></li>
          <li><Link to="/dashboard/profile">Profile</Link></li>
           <li><NavLink to="/dashboard/myParcels">My Parcels</NavLink></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
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