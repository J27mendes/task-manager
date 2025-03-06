import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import HomePage from './pages/HomePage.jsx'
import TaskDetailsPage from './pages/TaskDetails.jsx'
import TasksPage from './pages/TasksPage.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/TaskManager', element: <TasksPage /> },
  { path: '/TaskManager/:taskId', element: <TaskDetailsPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
)
