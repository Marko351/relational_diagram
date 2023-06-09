import React from 'react'

interface Props {
  children: React.ReactNode
}

export const Main = ({ children }: Props): JSX.Element => {
  return <div>{children}</div>
}
