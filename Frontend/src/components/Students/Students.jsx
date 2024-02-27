import React, { useState, useEffect } from 'react'
import './Students.scss'
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'
import columns from './columns.jsx'
import TableFilters from '../TableFilters'
import useAPI from '../../hooks/useAPI'
import { Spinner, Button, ButtonGroup, Text } from '@chakra-ui/react'

function Students() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [data, setData] = useState();
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    if (error) {
      console.error(`Error fetching data: `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setData(result);
  }, [result])

  const displayData = async (searchParam, collectionName) => {
    await fetchAPI({
      method: "GET",
      route: `read/${collectionName}`,
      body: searchParam,
      log: false,
      showReply: false,
    });
  };

  useEffect(() => {
    console.log(searchParam);
    if (searchParam.length === 0) {
      displayData(null, 'students');
    } else {
      displayData(searchParam, 'students');
    }
  }, [searchParam]);

  const handleEdit = (idElement) => {
    console.log('Editing element with ID:', idElement);
  };

  const handleDelete = (idElement) => {
    console.log('Deleting element with ID:', idElement);
  };
    
  const table = useReactTable({
    data,
    columns: columns(handleEdit, handleDelete),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="mainTableContainer">
      <div><TableFilters 
              searchParam = {searchParam} 
              setSearchParam = {setSearchParam} 
              />
      </div>
      <div className="tableview" w={table.getTotalSize()}>
        <div className="tableHeaders">
          {table.getHeaderGroups().map(headerGroup => (
            <div className='tr' key={headerGroup.id}>
              {headerGroup.headers.map(
                header => (
                  <div className='th' w={header.getSize()} key={header.id}>
                    {header.column.columnDef.header}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        {!data ? (
          <div className="noResults">No results found.</div>
        ) : (
          <div className='tableRows'>
            {table.getRowModel().rows.map(row => (
              <div className='tr' key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <div className='td' w={cell.column.getSize()} key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {data && (
          <React.Fragment>
            <Text fontSize='90%'>
              Page {table.getState().pagination.pageIndex + 1} of {""}
              {table.getPageCount()}
            </Text>
            <ButtonGroup>
              <Button
                size='100px'
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
              >
                {'<'}
              </Button>
              <Button
                size='sm'
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
              >
                {'>'}
              </Button>
            </ButtonGroup>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default Students
