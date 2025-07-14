import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Roots from '../Layout/Roots';
import Home from '../Component/Home/Home';
import SingUp from '../Pages/Authentication/SingUp';
import LogIn from '../Pages/Authentication/LogIn';
import Services from '../Component/Service/Service';
import Coverage from '../Pages/Coverage/Coverage';
import SendParcel from '../Pages/SendParcel/SendParcel';
import DashboardLayout from '../Layout/Dashboard/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import MyParcels from '../Pages/Mysection/MyParcels';
import Payment from '../Pages/Mysection/MakePayment/Payment';
import PaymentHistory from '../Pages/Mysection/MakePayment/PaymentHistory';
import DashboardOverview from '../Pages/Mysection/DashboardOverview';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children:[
      {
        index: true,
        element:<Home></Home>
      },
      {
        path:'/service',
        element:<Services></Services>

      },
      {
        path:'coverage',
        element:<Coverage></Coverage>,
        loader:()=>fetch('/serviceCenters.json')


      },
      { path: 'sendParcel',
        element:<SendParcel></SendParcel>,
         loader: async () => {
          const res = await fetch('/serviceCenters.json');
          return res.json(); 
        }

      },
      {

      },
      { path:'/singUp',
        element:<SingUp></SingUp>

      },
      {
        path:'/logIn',
        element:<LogIn></LogIn>
      }

      
    ]
  },
 {
  path: '/dashboard',
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      index:true,
      element:<DashboardOverview></DashboardOverview>

    },
    {
      path: 'myParcels', 
      element: <MyParcels/>
    },
    {
      path: 'payment/:id', 
      element: <Payment />
    },
    {
        path: 'payment-history',
        element: <PaymentHistory />
    }

  ]
}

]);

export default router;