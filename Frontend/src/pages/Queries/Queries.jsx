import React, { useState } from 'react'
import './Queries.scss'
import { Students, Teachers } from '@components'

const Queries = () => {
  return (
    <div className="mainContainer">
        <h2>Student Query</h2>
        <div className="tableContainer">
            <Students />
        </div>
        <h2>Teacher Query</h2>
        <div className="tableContainer">
            <Teachers />
        </div>
    </div>
  )
}

export default Queries
