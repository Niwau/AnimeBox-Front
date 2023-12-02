import { createContext, useState, useEffect, useContext } from 'react'
import { Children } from '../types/types'

interface IAuthContext {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = ({ children }: Children) => {
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsAuth(false)
      return
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    setIsAuth(false)
  }

  return <AuthContext.Provider value={{ isAuth, setIsAuth, logout }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
