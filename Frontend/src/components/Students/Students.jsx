import React, { useState, useEffect } from 'react'
import './Students.scss'
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'
import columns from './columns.jsx'
import TableFilters from '../TableFilters'
import useAPI from '../../hooks/useAPI'
import { Input, Button, ButtonGroup, Text} from '@chakra-ui/react'

function Students() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [data, setData] = useState();
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state:{
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  useEffect(() => {
    if (error) {
      console.error(`Error fetching data: `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setData(result);
  }, [result])

  const displayData = async (searchParam, collectionName) => {
    console.log(collectionName)
    await fetchAPI({
      method: "GET",
      route: `read/${collectionName}`,
      body: searchParam,
      log: false,
      showReply: false,
    });
  };

  useEffect(() => {
    displayData(null,'students');
    if (result) setData(result)
  }, []);


  return (
    <div className="mainTableContainer">
      <div><TableFilters/></div>
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
      <Text>
        Page {table.getState().pagination.pageIndex + 1} of {""}
        {table.getPageCount()}
      </Text>
      <ButtonGroup>
        <Button
        onClick = {
          () => table.previousPage()
        }
        isDisabled ={
          !table.getCanPreviousPage()
        }
        >{'<'}</Button>
        <Button
        onClick = {
          () => table.nextPage()
        }
        isDisabled ={
          !table.getCanNextPage()
        }
        >{'>'}</Button>
      </ButtonGroup>
    </div>
  )
}

export default Students
