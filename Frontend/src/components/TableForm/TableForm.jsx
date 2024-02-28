import React, { useState, useEffect } from 'react';
import './TableForm.scss';
import { Input, InputGroup, Select, Checkbox, Button } from '@chakra-ui/react';
import { useGetCourses } from '../../hooks/api/useGetCourses';
import { useInsertDocument } from '../../hooks/api/useInsert';

const TableForm = ({ columns }) => {
  const [student, setStudent] = useState({
    fullName: '',
    idSchool: '',
    grade: '',
    age: '',
    gender: '',
    eca: false,
    courses:[],
    admissionYear: 2024,
    gradeSection: ''
  });

  
  const gradeOptions = [
    "PRI01", "PRI02", "PRI03", "PRI04", "PRI05", "PRI06", "PRI07", "PRI08",
    "SEC01", "SEC02", "SEC03", "SEC04"
  ];

  const schools = [
    {
      idSchool: "ETA_NY",
      location: {
        State: "New York",
        City: "New York",
        Street: "5th Avenue"
      }
    },
    {
      idSchool: "ETA_CA",
      location: {
        State: "California",
        City: "Los Angeles",
        Street: "Westwood Bou"
      }
    },
    {
      idSchool: "ETA_IL",
      location: {
        State: "Illinois",
        City: "Chicago",
        Street: "State Street"
      }
    }
  ];

  function randomSection(length) {
    let result = '';
    const characters = 'ABC';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function addCourseFields(courses, student) {
    return courses.map(course => ({
      ...course,
      idGrade: student.grade,
      year: 2024,
      section: student.gradeSection,
      percentGrade: null
    }));
  }

  const {
    getCourses,
    data,
    errorGetCourses,
    loadingGetCourses,
  } = useGetCourses();

  const {
    insertDocument,
    resultInsert,
    errorInsert,
    loadingInsert,
  } = useInsertDocument();


  useEffect(() => {
    if (student.grade != '') {
      getCourses(student.grade);
    }
  }, [student.grade]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value;
    setStudent({ ...student, [name]: newValue });
  };

  const handleSubmit = () => {
    student.gradeSection = randomSection(1)
    const updatedCourses = addCourseFields(data, student);
    student.courses = updatedCourses
    insertDocument(student,'students')
    setStudent({
      fullName: '',
      idSchool: '',
      grade: '',
      age: '',
      gender: '',
      eca: false,
      courses:[],
      admissionYear: 2024,
      gradeSection: ''
    });

  };

  if (!columns) {
    return null;
  }

  const options = schools.map(school => school.idSchool);

  return (
    <div className='mainContainerTableForm'>
      <h2 style={{marginLeft:'0px', fontSize:'120%'}}>Insert Data</h2>
      <div className="tableform">
        {Object.keys(columns).map(columnKey => (
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
            style={{fontFamily: 'inherit', padding:'3px 0px'}}
            placeholder='Select School'
            value={student.idSchool}
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
            style={{fontFamily: 'inherit', padding:'3px 0px'}}
            placeholder='Select Grade'
            value={student.grade}
            name="grade"
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
      <Button maxW='20%' color="#FAFAFA" bgColor='#95B8D1' size='md' marginTop='2%' onClick={handleSubmit}>
        Add Student
      </Button>
      <h2 style={{marginLeft:'0px', fontSize:'120%'}}>Bulk Write</h2>
    </div>
  );
};

export default TableForm;