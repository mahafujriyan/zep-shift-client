import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../Context/AuthContext';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const DashboardOverview = () => {
      const [productCount, setProductCount] = useState(0);
const axiosSecure =UseAxiosSecure()
  const {user}=useContext(AuthContext)
  console.log(user)
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user-products-count?email=${user.email}`)
        .then(res => setProductCount(res.data.count))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);
   return (
  <div className="p-6 bg-pink-100 rounded shadow">
    <div className="flex items-center gap-4">
      <img
        src={user?.photoURL || '/default-avatar.png'}
        className="w-16 h-16 rounded-full border"
        alt="Profile"
      />
      <div>
        <h2 className="text-xl font-semibold">{user?.displayName || 'User'}</h2>
        <p className="text-sm text-gray-600">{user?.email || 'No email found'}</p>
      </div>
    </div>

    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Your Stats</h3>
      <p>Products You Added: <strong>{productCount}</strong></p>
    </div>
  </div>
);

};

export default DashboardOverview;