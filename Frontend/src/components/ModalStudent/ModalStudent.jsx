import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useApi2 from '../../hooks/useApi2'
import './ModalStudent.scss'

const ModalStudent = ({ setOpen, id }) => {
  const [response, loading, handleRequest] = useApi2()
  const [info, setInfo] = useState({
    admissionYear: null, age: 0, courses: [], fullName: '', idSchool: '', gender: '',
  })
  const [count, setCount] = useState(0)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (count === 0) {
      handleRequest('post', 'read/students', { _id: id })
      setCount(1)
    }
  }, [count])

  useEffect(() => {
    if (response && response.length > 0) {
      setInfo(response[0])
      console.log(response[0])
    }
  }, [response])

  const infoTeacher = (
    <>
      <h1>Teacher courses</h1>
      <div className="infoTeacher">
        <h2>{`${info.fullName !== '' ? info.fullName : 'Name'}`}</h2>
        <span>
          <h3>
            Age:
            {info.age}
          </h3>
          <h3>
            Gender:
            {info.gender}
          </h3>
          <h3>
            School:
            {info.idSchool.idSchool}
          </h3>
          <h3>
            Admission Year:
            {info.admissionYear}
          </h3>
          <h3>
            Grade Section:
            {info.gradeSection}
          </h3>
        </span>

        <div className="table-cont">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Grade</th>
                <th>Percent Grade</th>
                <th>Section</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {info.courses.map((course) => (
                <tr key={course}>
                  <td>{course.idCourse}</td>
                  <td>{course.idGrade}</td>
                  <td>{course.percentGrade!== null? course.percentGrade: 'N.A'}</td>
                  <td>{course.section}</td>
                  <td>{course.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button type="button" className="buttonClose" onClick={() => setOpen(false)}>Close</button>
        </div>
      </div>
    </>
  )

  return (
    <div className="modalstudent">
      <div className="modal">
        <div className="modalContent">
          {infoTeacher}
        </div>
      </div>
    </div>
  )
}

ModalStudent.defaultProps = {
  id: '65dbe563af43582c0a87b69e',
  setOpen: () => {},
}

ModalStudent.propTypes = {
  /** ID of the student */
  id: PropTypes.string,
  /** Function to close the modal */
  setOpen: PropTypes.func,
}

export default ModalStudent
