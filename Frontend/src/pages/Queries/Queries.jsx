/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import './Queries.scss'
import {
  Students, Teachers, Modal, ModalStudent,
} from '@components'

const Queries = () => {
  const [modal, setModal] = useState(false)
  const [modalStudent, setModalStudent] = useState(false)
  const [id, setId] = useState('')

  const handleOpenModal = (id_) => {
    setId(id_)
    setModal(true)
  }

  const handleOpenModalTC = (id_) => {
    setId(id_)
    setModalStudent(true)
  }

  return (
    <div className={`mainCont ${modal || modalStudent ? 'active' : ''}`}>
      <div className="mainContainer">
        <h2>Student Query</h2>
        <div className="tableContainer">
          <Students setOpen={handleOpenModalTC} />
        </div>
        <h2>Teacher Query</h2>
        <div className="tableContainer">
          <Teachers setOpen={handleOpenModal} />
        </div>
      </div>
      {modal ? <Modal id={id} setOpen={setModal} /> : null}
      {modalStudent ? <ModalStudent id={id} setOpen={setModalStudent} /> : null}
    </div>
  )
}

export default Queries
