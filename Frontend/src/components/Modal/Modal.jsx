/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  InputGroup, Select,
} from '@chakra-ui/react'
import useApi2 from '../../hooks/useApi2'
import './Modal.scss'
import { IoIosClose } from 'react-icons/io'
import { FaRegTrashAlt } from 'react-icons/fa'

const Modal = ({ id, setOpen }) => {
  const [response, , handleRequest] = useApi2()
  const [info, setInfo] = useState({
    admissionYear: null, age: 0, courses: [], fullName: '', idSchool: '', gender: '',
  })
  const [count, setCount] = useState(0)
  const [modal, setModal] = useState(false)
  const [course, setCourse] = useState({
    idCourse: '', idGrade: '', performance: null, gradeSection: '', year: 2025, name: '',
  })

  const courses = [
    {
      idCourse: 'MAT001',
      name: 'Mathematics',
    },
    {
      idCourse: 'PHY002',
      name: 'Physics',
    },
    {
      idCourse: 'ENG003',
      name: 'English Literature',
    },
    {
      idCourse: 'CHE004',
      name: 'Chemistry',
    },
    {
      idCourse: 'HIS005',
      name: 'History',
    },
    {
      idCourse: 'BIO006',
      name: 'Biology',
    },
    {
      idCourse: 'CS007',
      name: 'Computer Science',
    },
    {
      idCourse: 'ECO008',
      name: 'Economics',
    },
    {
      idCourse: 'ART009',
      name: 'Art History',
    },
    {
      idCourse: 'MUS010',
      name: 'Music Theory',
    },
    {
      idCourse: 'PSY011',
      name: 'Psychology',
    },
    {
      idCourse: 'PHY012',
      name: 'Physical Education',
    },
    {
      idCourse: 'POL013',
      name: 'Political Science',
    },
    {
      idCourse: 'LIT014',
      name: 'Literature',
    },
    {
      idCourse: 'SOC015',
      name: 'Sociology',
    },
    {
      idCourse: 'GEO016',
      name: 'Geography',
    },
    {
      idCourse: 'LAN017',
      name: 'Language Studies',
    },
    {
      idCourse: 'ENV018',
      name: 'Environmental Science',
    },
    {
      idCourse: 'MED019',
      name: 'Medicine',
    },
    {
      idCourse: 'PHI020',
      name: 'Philosophy',
    },
  ]

  useEffect(() => {
    if (count === 0) {
      handleRequest('post', 'read/teachers', { _id: id })
      setCount(1)
    }
  }, [count])

  useEffect(() => {
    if (response !== null && response.length > 0 && count === 1) {
      setInfo(response[0])
    }
  }, [response, count])

  const handleInputChange = (event) => {
    const {
      name, value, type, checked,
    } = event.target
    const newValue = type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    setCourse({ ...course, [name]: newValue })
  }

  const handleDelete = (courses_) => {
    handleRequest('put', 'update/teachers', [{ _id: id }, { $pull: { courses: courses_ } }])
    setCount(0)
  }

  useEffect(() => {
    console.log(course)
    if (course.idCourse !== '' && course.name === '') {
      const course_ = courses.find((course_) => course_.idCourse === course.idCourse)
      setCourse({ ...course, name: course_.name })
    }
  }, [course])

  const infoTeacher = (
    <>
      <div className="header">
        <h1>Courses</h1>
        <button type="button" className="closeModal" onClick={() => setOpen(false)}>
          <IoIosClose />
        </button>
      </div>

      <div className="infoTeacher small">
        <h2>{`${info.fullName !== '' ? info.fullName : 'Name'}`}</h2>
        <div className="infoContainer">
          <span className="information">
            Age:&nbsp;
            <span className="data">{info.age}</span>
          </span>
          <span className="information">
            Gender:&nbsp;
            <span className="data">{info.gender}</span>
          </span>
          <span className="information">
            School:&nbsp;
            <span className="data">{info.idSchool}</span>
          </span>
          <span className="information">
            Admission Year:&nbsp;
            <span className="data">{info.admissionYear}</span>
          </span>
        </div>

        <div className="table-cont" k>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Grade</th>
                <th>Performance</th>
                <th>Section</th>
                <th>Year</th>
                <th>{' '}</th>
              </tr>
            </thead>
            <tbody>
              {info.courses.map((course) => (
                <tr key={course}>
                  <td>{course.name}</td>
                  <td>{course.idGrade}</td>
                  <td>{course.performance !== null ? course.performance : 'N.A'}</td>
                  <td>{course.gradeSection}</td>
                  <td>{course.year}</td>
                  <td>
                    <button type="button" className="trashBtn" onClick={() => { handleDelete(course) }}>
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="" onClick={() => setModal(true)}>Add Course</button>
      </div>
    </>
  )

  const handleReturn = () => {
    setModal(false)
    setCourse({
      idCourse: '', idGrade: '', performance: null, gradeSection: '', year: 2025, name: '',
    })
    setCount(0)
  }

  const handleSend = () => {
    console.log('send', course, id)
    handleRequest('put', 'update/teachers', [{ _id: id }, { $push: { courses: course } }])
    setCount(0)
    handleReturn()
  }

  const gradeOptions = [
    'PRI01', 'PRI02', 'PRI03', 'PRI04', 'PRI05', 'PRI06', 'PRI07', 'PRI08',
    'SEC01', 'SEC02', 'SEC03', 'SEC04',
  ]

  const grade_courses = {
    PRI01: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI02: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI03: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI04: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI05: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI06: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI07: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    PRI08: ['MAT001', 'ENG003', 'HIS005', 'BIO006', 'ART009', 'MUS010', 'PHY012', 'LAN017'],
    SEC01: ['MAT001', 'PHY002', 'ENG003', 'CHE004', 'GEO016', 'LIT014', 'CS007', 'ECO008', 'SOC015', 'ENV018'],
    SEC02: ['MAT001', 'PHY002', 'ENG003', 'CHE004', 'GEO016', 'LIT014', 'CS007', 'POL013', 'SOC015', 'ENV018'],
    SEC03: ['MAT001', 'PHY002', 'ENG003', 'CHE004', 'GEO016', 'LIT014', 'CS007', 'POL013', 'MED019', 'PHI020'],
    SEC04: ['MAT001', 'PHY002', 'ENG003', 'CHE004', 'GEO016', 'LIT014', 'PSY011', 'POL013', 'MED019', 'PHI020'],
  }
  const form = (
    <>
      <div className="header">
        <h1>Add Course</h1>
        <button type="button" className="closeModal" onClick={handleReturn}>Return</button>
      </div>
      <div className="form">
        <div className="form-group">
          <InputGroup>
            <Select
              placeholder="Select Grade"
              value={course.idGrade}
              name="idGrade"
              onChange={handleInputChange}
              className="inputDropDown"
              variant="flushed"
            >
              {gradeOptions.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </Select>
          </InputGroup>

          {course.idGrade !== '' ? (
            <>
              <InputGroup>
                <Select
                  placeholder="Select Course"
                  value={course.idCourse}
                  name="idCourse"
                  onChange={handleInputChange}
                  className="inputDropDown"
                  variant="flushed"
                >
                  {grade_courses[course.idGrade].map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Select
                  placeholder="Select Section"
                  value={course.gradeSection}
                  name="gradeSection"
                  onChange={handleInputChange}
                  className="inputDropDown"
                  variant="flushed"
                >
                  {['A', 'B', 'C'].map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
              </InputGroup>
            </>
          ) : null}
        </div>
        <div className="button-group">
          {course.idGrade !== '' && course.name !== '' && course.gradeSection !== ''
            ? (<button type="button" className="addBtn" onClick={handleSend}>Save</button>) : null}
        </div>
      </div>
    </>
  )

  return (
    <div className="modal">
      <div className="modalContent">
        {modal ? form : infoTeacher}
      </div>
    </div>
  )
}

Modal.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  id: '65dbe766af43582c0a8879fd',
}

export default Modal
