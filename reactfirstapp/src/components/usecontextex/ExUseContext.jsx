import React, { useState } from 'react'
import A from './usecontextex/A'
export const contextInfo=React.createContext();
const ExUseContext = () => {
    const [info,setInfo]=useState("Context Use");
    
  return (
    <div>
        <h2>ExUseContext Component</h2>
        <contextInfo.Provider value={{info,setInfo}}>
            <A/>
        </contextInfo.Provider>       
    </div>
  )
}

export default ExUseContext