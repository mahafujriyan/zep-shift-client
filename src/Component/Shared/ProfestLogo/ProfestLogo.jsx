import React from 'react';
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
         <Link to="/">
            <div className='flex items-end'>
                <img className='mb-2' src='/Assets/logo.png' alt="" />
                <p className='text-3xl -ml-2 font-extrabold'>ProFast</p>
            </div>
        </Link>
    );
};

export default ProfastLogo;