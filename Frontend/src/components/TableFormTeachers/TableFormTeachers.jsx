import React, { useState, useEffect } from 'react';
import './TableFormTeachers.scss';
import { Input, InputGroup, Select, Checkbox, Button } from '@chakra-ui/react';
import { useInsertDocument } from '../../hooks/api/useInsert';

const TableFormTeachers = ({ columns }) => {

  const [teacher, setTeacher] = useState({
    fullName: '',
    idSchool: '',
    age: '',
    gender: '',
    admissionYear: 2024,
  });

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

  const {
    insertDocument,
    resultInsert,
    errorInsert,
    loadingInsert,
  } = useInsertDocument();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value;
    setTeacher({ ...teacher, [name]: newValue });
  };

  const handleSubmit = () => {
    insertDocument(teacher,'teachers')
    setTeacher({
      fullName: '',
      idSchool: '',
      age: '',
      gender: '',
      admissionYear: 2024,
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
              value={teacher[columnKey]}
              onChange={handleInputChange}
            />
          </InputGroup>
        ))}
        <InputGroup>
          <label style={{ marginRight: '20px' }}>School</label>
          <Select
            style={{fontFamily: 'inherit', padding:'3px 0px'}}
            placeholder='Select School'
            value={teacher.idSchool}
            name="idSchool"
            onChange={handleInputChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Select>
        </InputGroup>
      </div>
      <Button maxW='20%' color="#FAFAFA" bgColor='#95B8D1' size='md' marginTop='2%' onClick={handleSubmit}>
        Add Teacher
      </Button>
    </div>
  );
};

export default TableFormTeachers;