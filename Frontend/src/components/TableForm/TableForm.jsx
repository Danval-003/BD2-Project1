import React, { useState, useEffect } from 'react'
import './TableForm.scss'
import {
  Input, InputGroup, Select, Checkbox, Button,
} from '@chakra-ui/react'
import { useGetCourses } from '../../hooks/api/useGetCourses'
import { useInsertDocument } from '../../hooks/api/useInsert'
import SingleFileUploader from '../SingleFileUploader'

const TableForm = ({ columns }) => {
  const [student, setStudent] = useState({
    fullName: '',
    idSchool: '',
    idGrade: '',
    age: '',
    gender: '',
    eca: false,
    courses: [],
    admissionYear: 2024,
    gradeSection: '',
  })

  const gradeOptions = [
    'PRI01', 'PRI02', 'PRI03', 'PRI04', 'PRI05', 'PRI06', 'PRI07', 'PRI08',
    'SEC01', 'SEC02', 'SEC03', 'SEC04',
  ]

  const schools = [
    {
      idSchool: 'ETA_NY',
      location: {
        State: 'New York',
        City: 'New York',
        Street: '5th Avenue',
      },
    },
    {
      idSchool: 'ETA_CA',
      location: {
        State: 'California',
        City: 'Los Angeles',
        Street: 'Westwood Bou',
      },
    },
    {
      idSchool: 'ETA_IL',
      location: {
        State: 'Illinois',
        City: 'Chicago',
        Street: 'State Street',
      },
    },
  ]

  const randomSection = (length) => {
    let result = ''
    const characters = 'ABC'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  const addCourseFields = (courses, student) => courses.map((course) => ({
    ...course,
    idGrade: student.grade,
    year: 2024,
    section: student.gradeSection,
    percentGrade: null,
  }))

  const { getCourses, data } = useGetCourses()
  const { insertDocument } = useInsertDocument()

  useEffect(() => {
    if (student.idGrade != '') {
      getCourses(student.idGrade)
    }
  }, [student.idGrade])

  const handleInputChange = (event) => {
    const {
      name, value, type, checked,
    } = event.target
    let newValue = type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    if (name === 'idSchool') {
      schools.map((school) => {
        if (value === school.idSchool) {
          newValue = school
        }
      })
    }
    console.log(name, newValue)
    setStudent({ ...student, [name]: newValue })
  }

  const handleSubmit = () => {
    student.gradeSection = randomSection(1)
    const updatedCourses = addCourseFields(data, student)
    student.courses = updatedCourses
    insertDocument(student, 'students')
    setStudent({
      fullName: '',
      idSchool: {},
      idGrade: '',
      age: '',
      gender: '',
      eca: false,
      courses: [],
      admissionYear: 2024,
      gradeSection: '',
    })
  }

  if (!columns) {
    return null
  }

  const options = schools.map((school) => school.idSchool)

  return (
    <div className="mainContainerTableForm">
      <h2 style={{ marginLeft: '0px', fontSize: '120%' }}>Insert Data</h2>
      <div className="tableform">
        {Object.keys(columns).map((columnKey) => (
          <InputGroup key={columnKey}>
            <label style={{ marginRight: '20px' }} htmlFor={columnKey}>{columns[columnKey][0]}</label>
            <Input
              style={{ fontFamily: 'inherit' }}
              type={columns[columnKey][1]}
              id={columnKey}
              name={columnKey}
              placeholder={`Enter ${columns[columnKey][0]}`}
              value={student[columnKey]}
              onChange={handleInputChange}
            />
          </InputGroup>
        ))}
        <InputGroup>
          <label style={{ marginRight: '20px' }}>School</label>
          <Select
            style={{ fontFamily: 'inherit', padding: '3px 0px' }}
            placeholder="Select School"
            value={student.idSchool.idSchool}
            name="idSchool"
            onChange={handleInputChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup>
          <label style={{ marginRight: '20px' }}>Grade</label>
          <Select
            style={{ fontFamily: 'inherit', padding: '3px 0px' }}
            placeholder="Select Grade"
            value={student.idGrade}
            name="idGrade"
            onChange={handleInputChange}
          >
            {gradeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Select>
        </InputGroup>
        <Checkbox
          defaultChecked={student.eca}
          name="eca"
          onChange={handleInputChange}
        >
          ECA
        </Checkbox>
      </div>
      <Button
        fontWeight="600"
        fontSize="14px"
        style={{ alignSelf: 'center' }}
        width="15%"
        color="#FAFAFA"
        bgColor="#95B8D1"
        size="md"
        marginTop="2%"
        onClick={handleSubmit}
      >
        Add Student
      </Button>
      <SingleFileUploader />
    </div>
  )
}

export default TableForm
