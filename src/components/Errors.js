import React from 'react'

const Errors = ({errors}) => {
  if ( errors.length == 0 ) {
    return null 
  }
  return (
    <div className='error'>
      <h3>errors in update</h3>
      <ul>
        {errors.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  )
}

export default Errors