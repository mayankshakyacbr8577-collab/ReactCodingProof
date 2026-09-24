import React from 'react'

 export default function App() {
  let name = "Mayank Shakya";
  let listOfName={
    name : "Tony Stark",
    age :45,
    Id : "Mark-42",
    Class: "MARVAL" ,
    }
    let lang=["C","C++","Java","Python","JavaScript"]
  return (
    <>
    <h3>List of languages : </h3>
    {lang.map((value, index) => (
      <li key={index}>{index}. {value}</li>
    ))}
{/* <h3>{lang[2]}</h3> */}
      {/* <h1>Welcome to {name} World! </h1>
      <h2>This is my first component</h2>
      <h3>My name is {listOfName.name}</h3>
      <h3>My age is {listOfName.age}</h3>
      <h3>My Id is {listOfName.Id}</h3>
      <h3>My Class is {listOfName.Class}</h3> */}
    </>
  )
}
