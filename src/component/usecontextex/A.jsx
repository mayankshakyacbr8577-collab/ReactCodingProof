import React from 'react'

export const contexInfo = React.createContext()

const A = () => {
  return (
    <div>
      <h2>Welcome to the A Component</h2>
      <B/>
    </div>
  )
}

export default A
