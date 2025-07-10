import React from 'react';
import Banner from '../Banner/Banner';
import WorkCard from '../Work/WorkCard';
import Service from '../Service/Service';

const Home = () => {
    return (
        <div className='space-y-4 '>
            <Banner></Banner>
            <WorkCard></WorkCard>
            <Service></Service>
        </div>
    );
};

export default Home;