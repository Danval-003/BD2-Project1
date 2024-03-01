/* eslint-disable react/no-unknown-property */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './Teachers.scss'
import {
  flexRender, getCoreRowModel, useReactTable, getPaginationRowModel,
} from '@tanstack/react-table'
import {
  Button, ButtonGroup, Text, useDisclosure,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { columns, columnsDict } from './columns'
import TableFilters from '../TableFilters'
import { useDeleteDocument } from '../../hooks/api/useDelete'
import { useDisplayData } from '../../hooks/api/useDisplayData'
import { useGlobalSearch } from '../../hooks/api/useGlobalSearch'
import TableFormTeachers from '../TableFormTeachers'
import EditModal from '../EditModal'

const Teachers = ({ setOpen }) => {
  const [data, setData] = useState()
  const [element, setElement] = useState()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const {
    deleteDocument,
    resultDeleting,
    errorDeleting,
    loadingDeleteDocument,
  } = useDeleteDocument()

  const {
    displayDataSet,
    displayData,
    errorDisplay,
    loadingDisplay,
  } = useDisplayData()

  const {
    globalSearch,
    dataSearch,
    errorGlobSearch,
    loadingGlobSearch,
  } = useGlobalSearch()

  const getFilteredData = (query) => {
    if (query.length != 0) {
      globalSearch(query, 'teachers')
    } else {
      setData(displayData)
    }
  }

  useEffect(() => {
    setData(dataSearch)
  }, [dataSearch])

  useEffect(() => {
    setData(displayData)
  }, [displayData])

  useEffect(() => {
    displayDataSet('teachers')
  }, [isOpen])

  useEffect(() => {
    displayDataSet('teachers')
  }, [])

  const handleEdit = (idElement) => {
    onOpen()
    setElement(idElement)
    displayDataSet('teachers')
  }

  const handleViewCourses = (idElement) => {
    setOpen(idElement)
    console.log('View Courses Of Element with ID:', idElement)
  }

  const handleDelete = async (idElement) => {
    try {
      await deleteDocument(idElement, 'teachers')
      displayDataSet('teachers')
    } catch (error) {
      console.error('Error deleting element:', error)
    }
  }

  const table = useReactTable({
    data,
    columns: columns(handleEdit, handleDelete, handleViewCourses),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="mainTableContainer">
      <div>
        <TableFilters
          callback={getFilteredData}
        />
      </div>
      <div className="tableview" w={table.getTotalSize()}>
        <div className="tableHeaders">
          {table.getHeaderGroups().map((headerGroup) => (
            <div className="tr" key={headerGroup.id}>
              {headerGroup.headers.map(
                (header) => (
                  <div className="th" w={header.getSize()} key={header.id}>
                    {header.column.columnDef.header}
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
        {!data ? (
          <div className="noResults">No results found.</div>
        ) : (
          <div className="tableRows">
            {table.getRowModel().rows.map((row) => (
              <div className="tr" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <div className="td" w={cell.column.getSize()} key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
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
          <>
            <Text fontSize="90%">
              Page
              {' '}
              {table.getState().pagination.pageIndex + 1}
              {' '}
              of
              {' '}

              {table.getPageCount()}
            </Text>
            <ButtonGroup>
              <Button
                size="100px"
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
              >
                {'<'}
              </Button>
              <Button
                size="sm"
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
              >
                {'>'}
              </Button>
            </ButtonGroup>
          </>
        )}
      </div>
      <TableFormTeachers columns={columnsDict} />
      {element && (
      <EditModal
        collectionName="teachers"
        isStudent={false}
        element={element}
        isOpen={isOpen}
        onClose={onClose}
      />
      )}
    </div>
  )
}

Teachers.propTypes = {
  setOpen: PropTypes.func.isRequired,
}

export default Teachers
