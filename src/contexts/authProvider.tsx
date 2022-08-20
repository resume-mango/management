import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { fetchAuthData } from '../helpers/fetchAuthData'
import { useWindowFocus } from './windowFocus'

type User = {
  firstName: string
  lastName: string
  plan: {
    name: string
    expires_on: string
  }
  ref: string
}
interface IContext {
  user: User | Record<string, never>
  token: string
  isLoading: boolean
  setUser: (_val: any) => void
}

const contextValues = {
  token: '',
  isLoading: true,
  user: {},
  setUser: (_val: any) => {},
}
const AuthContext = React.createContext<IContext>(contextValues)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<User | Record<string, never>>({})
  const [isLoading, setIsLoading] = useState(true)
  const cookies = new Cookies()
  const isSess = cookies.get('rm_ia')
  const { windowIsActive } = useWindowFocus()
  const navigate = useNavigate()
  const location = `${process.env.AUTH_HOST}/auth/login?rm_path=${window.location.pathname}&rm_name=manage`

  const checkAuth = async () => {
    await fetchAuthData(location, navigate, setUser, setToken, setIsLoading)
  }
  useEffect(() => {
    if (!windowIsActive) return

    if (isSess) {
      if (token) return
      checkAuth()
    } else {
      setUser({})
      setToken('')
      window.location.href = location
    }
  }, [token, isSess, windowIsActive])

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const { token, user, isLoading, setUser } = React.useContext(AuthContext)

  return { token, user, isLoading, setUser }
}

export { AuthProvider, useAuth }
