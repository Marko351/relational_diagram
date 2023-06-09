import { type ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactElement
  isAuth: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children: Component, isAuth }) => {
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  return Component
}
