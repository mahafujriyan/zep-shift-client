import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Routers/Routers.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Pages/Context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { 
  QueryClient,
  QueryClientProvider } from '@tanstack/react-query'


createRoot(document.getElementById('root')).render(
  <StrictMode>

  <QueryClientProvider client={QueryClient}>
        <AuthProvider>
      <RouterProvider router={router} />
       <Toaster position="top-center" reverseOrder={false} />
  </AuthProvider>
    </QueryClientProvider>



  </StrictMode>,
)
