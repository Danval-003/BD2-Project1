import React from 'react'
import './TableFilters.scss'
import { Input, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const TableFilters = ({ callback }) => {

  const handleInputChange = (event) => {
    callback(event.target.value);
  };

  return (
    <div className="tablefilters" style={{ marginBottom: '12px' }}>
      <SearchIcon color={'#809BCE'} />
      <InputGroup maxW={"12rem"}>
        <Input
          variant='flushed'
          placeholder='Search Something'
          borderRadius={5}
          type="text"
          style={{ color: "#979dac", height: '2rem', background: '#979dac2a', border: 'none', padding: "0px 10px" }}
          onChange={handleInputChange}
        />
      </InputGroup>
    </div>
  );
};

export default TableFilters;
