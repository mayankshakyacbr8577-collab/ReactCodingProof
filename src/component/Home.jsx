import React from 'react'

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Component</h2>
      <contexInfo.Provider value={{name:"Rohit",email:"rohit@example.com"}}>
        <A/>
      </contexInfo.Provider>
    </div>
  )
}

export default Home
