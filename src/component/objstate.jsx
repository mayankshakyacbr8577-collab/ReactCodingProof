import React, { useState } from 'react'

const App = () => {
const [name, setName] = useState("KIET");
function changeName(newName) {
  setName(newName);
}
  return (
    <div>
      <h3>Name : {name}</h3>
      <button onClick={() => changeName("KIET MCA")}> Change Name</button>
      
    </div>
  );
};
export default App;  