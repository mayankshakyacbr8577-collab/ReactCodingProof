import React from 'react';
import Student from './Student';

const Body = () => {
    return (
        <div>
            <h1>Welcome to the Body Component</h1>

            <Student
                id={1}
                name="Mayank"
                marks={85}
                section="C"
            />
        </div>
    );
};

export default Body;