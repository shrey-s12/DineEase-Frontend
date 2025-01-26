import React from 'react'


const Counter = ({ counter }) => {
  return (
    <div className="border border-gray-200 p-4 m-4">
      <h2 className="text-lg font-bold">{counter.name}</h2>
      <p>{counter.description}</p>
    </div>
  )
}

export default Counter