import { createContext, useState, useEffect, useContext } from 'react'
import { Children } from '../types/types'

interface IAuthContext {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = ({ children }: Children) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuth(true)
      return
    }
  }, [])

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
