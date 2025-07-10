import React from 'react';

const WorkCard = () => {
    return (
        <div>
            <h1 className='text-3xl font-semibold text-black'>How it Works</h1>
            <div className=' grid grid-cols-2  md:grid-cols-4 gap-2 p-2 mx-4'>
                <div className= 'bg-[#FFFFFFB3] rounded-2xl  '>
                    <img src="/Assets/delivery-van.png" alt="" />

                    <h3 className='text-[#03373D]'>Booking Pick & Drop</h3>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>

                </div>
                <div className='bg-[#FFFFFFB3] rounded-2xl '>
                    <img src="/Assets/delivery-van.png" alt="" />

                    <h3 className='text-[#03373D]'>Booking Pick & Drop</h3>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>

                </div>
                <div className='bg-[#FFFFFFB3] rounded-2xl '>
                    <img src="/Assets/delivery-van.png" alt="" />

                    <h3 className='text-[#03373D]'>Booking Pick & Drop</h3>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>

                </div>
                <div className='bg-[#FFFFFFB3]  rounded-2xl'>
                    <img src="/Assets/delivery-van.png" alt="" />

                    <h3 className='text-[#03373D]'>Booking Pick & Drop</h3>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>

                </div>
            </div>
        </div>
    );
};

export default WorkCard;