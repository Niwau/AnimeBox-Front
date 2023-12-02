import { createBrowserRouter } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'
import { Root } from '../layouts/Root'
import { Lists } from '../pages/Lists'
import { ListPage } from '../pages/ListPage'
import { AnimesPage } from '../pages/AnimesPage'
import { AnimePage } from '../pages/AnimePage'
import { UsersPage } from '../pages/UsersPage'

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
        path: 'lists',
        element: <Lists />,
      },
      {
        path: 'lists/:id',
        element: <ListPage/>,
      },
      {
        path: 'animes',
        element: <AnimesPage/>
      },
      {
        path: 'animes/:id',
        element: <AnimePage/>
      },
      {
        path: 'users',
        element: <UsersPage/>
      }
    ],
  },
])
