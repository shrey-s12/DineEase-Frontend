import React from 'react'


const Counter = ({ counter }) => {
  console.log("Counter", counter)
  return (
    <div className="border border-gray-200 p-4 m-4">
      <h2 className="text-lg font-bold">{counter.name}</h2>
      <p>{counter.description}</p>
      <span className='font-medium'>Owners</span>
      {counter.merchants.map((merchant) => (
        <div key={merchant._id} className="flex justify-between items-center">
          <span>{merchant.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Counter