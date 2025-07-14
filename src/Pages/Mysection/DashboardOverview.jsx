import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../Context/AuthContext';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const DashboardOverview = () => {
      const [productCount, setProductCount] = useState(0);
const axiosSecure =UseAxiosSecure()
  const {user}=useContext(AuthContext)
  
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user-products-count?email=${user.email}`)
        .then(res => setProductCount(res.data.count))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);
    return (
         <div className="p-6 bg-gray-600 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL || '/default-profile.png'}
          alt="User"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName || 'No Name'}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium">Your Stats</h3>
        <p>Total Products Added: <strong>{productCount}</strong></p>
        {/* Add more stats here */}
      </div>
    </div>
    );
};

export default DashboardOverview;