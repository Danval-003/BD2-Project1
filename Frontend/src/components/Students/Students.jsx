import React, { useState } from 'react'
import './Students.scss'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import columns from './columns.jsx'

const test = [
  {
    _id: { $oid: '65d5a6bc548d36f811c45695' },
    gender: 'M',
    fullName: 'Milo Traetta',
    age: '16',
    eca: 'False',
    admissionYear: '2020',
    gradeSection: 'A',
    idGrade: 'SEC03',
    courses: [
      {
        idGrade: 'PRI08',
        section: 'B',
        idCourse: 'ART009',
        percentGrade: { $numberDouble: '43.45' },
        year: { $numberInt: '2021' },
      },
      {
        idGrade: 'PRI08',
        section: 'B',
        idCourse: 'MUS010',
        percentGrade: { $numberDouble: '77.11' },
        year: { $numberInt: '2021' },
      },
      {
        idGrade: 'SEC03',
        section: 'A',
        idCourse: 'PHI020',
        year: { $numberInt: '2024' },
        percentGrade: null,
      },
    ],
    idSchool: 'ETA_IL',
  },
  {
    _id: { $oid: '65d5a6bc548d36f811c456a9' },
    gender: 'M',
    fullName: 'Larry Woods',
    age: '12',
    eca: 'False',
    admissionYear: '2012',
    gradeSection: 'C',
    idGrade: 'PRI07',
    courses: [
      {
        idGrade: 'PRI07',
        section: 'C',
        idCourse: 'MAT001',
        percentGrade: null,
        year: { $numberInt: '2024' },
      },
    ],
    idSchool: 'ETA_NY',
  },
]

function Students() {
  const [data, setData] = useState(test);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state:{
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel()
  });

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
        {data.length === 0 ? (
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
    </div>
  )
}

export default Students
