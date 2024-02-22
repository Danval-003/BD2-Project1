import React, { useState } from 'react'
import './Queries.scss'
import { Students } from '@components'

const Queries = () => {
  return (
    <div className="mainContainer">
        <h2>Student Query</h2>
        <div className="tableContainer">
            <Students />
        </div>
    </div>
  )
}

export default Queries
