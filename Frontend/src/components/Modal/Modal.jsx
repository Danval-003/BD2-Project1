import React from 'react'
import PropTypes from 'prop-types'
import './Modal.scss'

const Modal = ({name, courses}) => (
  <div className="modal">
    <div className="modalContent">
      <h1>Teacher courses</h1>
      <div className='infoTeacher'>
        <h2>{name}</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
      <button type="button">Close</button>
    </div>
  </div>
)

Modal.propTypes = {
  name: PropTypes.string,
  courses: PropTypes.arrayOf(PropTypes.string),
}

Modal.defaultProps = {
  name: 'Manolo',
  courses: [],
}

export default Modal
