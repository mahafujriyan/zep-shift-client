import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import ProfastLogo from './ProfestLogo/ProfestLogo';
import { AuthContext } from '../../Pages/Context/AuthContext';

const Navbar = () => {
  const {user,logOut}=useContext(AuthContext)
  const navigate =useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(result => { 
              console.log(result)
              navigate('/')

            })
            .catch(error => console.log(error))
    }

    const navLinks =
    
    <>
      <li><NavLink to="/" className="text-[#606060]">Home</NavLink></li>
      <li><NavLink to="/service" className="text-[#606060]">Services</NavLink></li>
      <li><NavLink to="/coverage" className="text-[#606060]">Coverage</NavLink></li>
      <li><NavLink to="/sendParcel" className="text-[#606060]"> Send Parcel</NavLink></li>
      {
            user && <>
                <li><NavLink to="/dashboard" className="text-[#606060]">Dashboard</NavLink></li>
            </>
        }

        <li><NavLink to="/about">About Us</NavLink></li>
     
    </>
   
  
    return (
       
    <div className="navbar  container mx-auto  bg-white shadow-sm px-4 rounded-2xl">
 
  
      <div className="navbar-start">
        {/* Dropdown toggle button for mobile */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
       <ProfastLogo></ProfastLogo>
      </div>

      {/* Center Section (Visible on lg screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* End Section */}
  <div className="navbar-end">
                {user ?
                    <button onClick={handleLogOut} className='btn btn-primary text-black'>Log Out</button>
                    :
                    <Link to="/login" className='btn btn-primary  text-black'>Login</Link>}
            </div>
    </div>
   
        
    );
};

export default Navbar;