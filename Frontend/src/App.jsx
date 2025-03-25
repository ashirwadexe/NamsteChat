import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Setting from './pages/Setting'
import Profile from './pages/Profile'

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element: <Home/>
    },
    {
      path:'/login',
      element: <Login/>
    },
    {
      path:'/signup',
      element: <SignUp/>
    },
    {
      path:'/setting',
      element: <Setting/>
    },
    {
      path:'/profile',
      element: <Profile/>
    },
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App