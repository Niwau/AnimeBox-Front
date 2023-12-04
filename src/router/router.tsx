import { createBrowserRouter } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'
import { Lists } from '../pages/Lists'
import { ListPage } from '../pages/ListPage'
import { AnimesPage } from '../pages/AnimesPage'
import { AnimePage } from '../pages/AnimePage'
import { UsersPage } from '../pages/UsersPage'
import { Protected } from '../layouts/Protected'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'lists',
    element: (
      <Protected>
        <Lists />
      </Protected>
    ),
  },
  {
    path: 'lists/:id',
    element: (
      <Protected>
        <ListPage />
      </Protected>
    ),
  },
  {
    path: 'animes',
    element: (
      <Protected>
        <AnimesPage />
      </Protected>
    ),
  },
  {
    path: 'animes/:id',
    element: (
      <Protected>
        <AnimePage />
      </Protected>
    ),
  },
  {
    path: 'users',
    element: (
      <Protected>
        <UsersPage />
      </Protected>
    ),
  },
])
