import React from 'react';

const Student = (props) => {
    const { id, name, marks, section } = props;
    const heading={
        color:'blue',
    }
  return (
    <div>
      <h2 style ={heading}>Student Information</h2>
      <h3 style ={{fontSize:'20px' , color:'black'}}>Student ID : {id}</h3>
      <h3 style ={{fontSize:'20px' , color:'black'}}>Student Name : {name}</h3>
      <h3 style ={{fontSize:'20px' , color:'black'}}>Student Marks : {marks}</h3>
      <h3 style ={{fontSize:'20px' , color:'black'}}>Student Section : {section}</h3>
    </div>
  );
};

export default Student;