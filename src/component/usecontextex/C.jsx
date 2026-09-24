import React from 'react'
import React, { useContext } from 'react'
import { contexInfo } from './A'
const C = () => {
  const context = useContext(contexInfo)
  return (
    <div>
      <h2>Welcome to the C Component</h2>
      <p>Name: {context.name}</p>
      <p>Email: {context.email}</p>
    </div>
  )
}

export default C
