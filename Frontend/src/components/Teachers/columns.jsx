/* eslint-disable no-underscore-dangle */
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'

import {
  GoKebabHorizontal, GoTrash, GoPencil, GoMortarBoard,
} from 'react-icons/go'

import React from 'react'

const columns = (handleEdit, handleDelete, handleViewCourses) => [
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'admissionYear',
    header: 'Admission Year',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'idSchool',
    header: 'School',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    id: 'actions',
    cell: (props) => {
      const student = props.row.original

      return (
        <Menu m="auto" zIndex="dropdown">
          <MenuButton
            bg="transparent"
            as={IconButton}
            aria-label="Options"
            icon={<GoKebabHorizontal size="18px" />}
            variant="outline"
            boxSize={25}
          />
          <MenuList bg="white" borderRadius="10px" border="1px solid #CBD5E0" zIndex="20">
            <MenuItem
              icon={<GoMortarBoard size="18px" />}
              onClick={() => handleViewCourses(student._id)}
            >
              {' '}
              View Courses
            </MenuItem>
            <MenuItem
              icon={<GoPencil size="18px" />}
              onClick={() => handleEdit(student._id)}
            >
              {' '}
              Edit Element
            </MenuItem>
            <MenuItem
              icon={<GoTrash size="18px" />}
              onClick={() => handleDelete(student._id)}
            >
              {' '}
              Delete Element
            </MenuItem>
          </MenuList>
        </Menu>
      )
    },
  },
]

const columnsDict = {
  gender: ['Gender', 'text'],
  fullName: ['Name', 'text'],
  age: ['Age', 'number'],
}

export { columns, columnsDict }
