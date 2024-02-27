import React from 'react';
import './TableForm.scss';
import { Input, InputGroup, Select, Checkbox} from '@chakra-ui/react';

const TableForm = ({ columns }) => {
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

  if (!columns) {
    console.log(columns);
    return null;
  }

  const options = schools.map(school => school.idSchool);

  return (
    <div className='mainContainer'>
      <h2>Insert Data</h2>
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
            />
          </InputGroup>
        ))}
        <InputGroup>
          <label style={{ marginRight: '20px' }}>School</label>
          <Select style={{ fontFamily: 'inherit' }} placeholder='Select School'>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Select>
        </InputGroup>
        <Checkbox defaultChecked>ECA</Checkbox>
      </div>
    </div>
  );
};

export default TableForm;
