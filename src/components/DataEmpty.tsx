import React from 'react'

function DataEmpty() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-400">No Data Available</h1>
        <p className="text-gray-500 mt-2">Please check back later.</p>
      </div>
    </div>
  )
}

export default DataEmpty