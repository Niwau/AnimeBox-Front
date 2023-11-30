import { Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Login } from '../pages/Login'

export const Root = () => {
  const { isAuth } = useAuthContext()
  const location = useLocation();

  if (location.pathname == '/signup') {
    return <Outlet />
  }

  if (!isAuth) {
    return <Login />
  }

  return <Outlet />
}
