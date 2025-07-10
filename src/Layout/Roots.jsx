import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer';

const Roots = () => {
    return (
        <div className="urbanist-font min-h-screen container mx-auto my-2  flex flex-col space-y-3 ">
           
             <Navbar></Navbar>
           
            <div className='flex-grow'>
                <Outlet></Outlet>
            </div>
        
            <Footer></Footer>
            
   
        </div>
    );
};

export default Roots;