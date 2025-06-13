import React from 'react'

function DataEmpty() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-52 lg:h-52">
        <h1 className="text-base lg:text-2xl font-bold text-gray-400">No Data Available</h1>
        <p className="text-sm lg:text-lg text-gray-500 mt-2">Please check back later.</p>
      </div>
    </div>
  )
}

export default DataEmpty