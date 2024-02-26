import React from 'react'
import './TableFilters.scss'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const TableFilters = () => (
  <div className="tablefilters" style={{ marginBottom: '12px' }}>
    <InputGroup maxW={"12rem"}>
      <InputLeftElement
        color='#95B8D1'
        pointerEvents='none'
        children={<SearchIcon color="#95B8D1" />}
      />
      <Input
        variant='flushed'
        placeholder='Search Something'
        borderRadius={5}
        type="text"
        style={{ color:"#979dac", height:'2rem',background: '#979dac2a', border: 'none' }}
      />
    </InputGroup>
  </div>
)

export default TableFilters
