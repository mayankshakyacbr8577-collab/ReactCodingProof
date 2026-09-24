import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()

  return (
    <div className='container mt-5'>
      <h2>Programaticaly navigation in React.js</h2>
      <div className='d-flex justify-content-center gap-3 mt-5'>
        <button className='btn btn-primary' onClick={() => navigate(-1)}>
          Back
        </button>
        <button className='btn btn-primary' onClick={() => navigate("/", { replace: true })}>
          Go to Home
        </button>
         <button className='btn btn-primary' onClick={() => navigate(1)}>
          Forward
        </button>
      </div>
    </div>
  )
}

export default Contact
