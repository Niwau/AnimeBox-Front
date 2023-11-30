import { createBrowserRouter } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'
import { Root } from '../layouts/Root'
import { Dashboard } from '../pages/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
])
