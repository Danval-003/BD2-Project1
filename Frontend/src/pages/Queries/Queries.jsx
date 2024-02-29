import React, { useState } from 'react'
import './Queries.scss'
import { Students, Teachers, Modal } from '@components'

const Queries = () => {
  const [modal, setModal] = useState(false)

  return (
    <div className={`mainCont ${modal ? 'active' : ''}`}>
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
      {modal ? <Modal /> : null}
    </div>
  )
}

export default Queries
