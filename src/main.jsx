import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import TaskDetailsPage from './pages/TaskDetails.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/TaskManager/:taskId', element: <TaskDetailsPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
