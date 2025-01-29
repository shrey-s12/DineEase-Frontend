import React from 'react';

const Counter = ({ counter }) => {
  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 w-full max-w-md">

      <div className="flex justify-between items-center">
        <img
          src={counter.image}
          alt={counter.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">{counter.name}</h2>
          <p className="text-sm min-h-16 text-gray-600 dark:text-gray-400">{counter.description}</p>
        </div>
      </div>

      <span className="font-medium text-gray-300 mb-0">Owners:</span>
      <div className="flex space-x-2">
        {counter.merchants.length > 0 ? (
          counter.merchants.map((merchant) => (
            <div key={merchant._id} className="flex justify-between items-center text-gray-300">
              <span>{merchant.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No owners listed.</p>
        )}
      </div>
    </div>
  );
};

export default Counter;
