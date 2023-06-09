import React, { type ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface RestrictedRouteProps {
  functionality: number
  permission: number
  children: ReactElement
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ children: Component, functionality, permission }) => {
  const userFunctionalities = [1, 2, 3, 4, 5, 6]
  const userPermissions = [100, 101, 102, 200, 201]

  if (functionality && userFunctionalities?.includes(functionality)) {
    return Component
  }

  if (permission && userPermissions?.includes(permission)) {
    return Component
  }

  return <Navigate to='/404' />
}
