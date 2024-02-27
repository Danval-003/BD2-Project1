import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton
  } from '@chakra-ui/react';

  import { GoKebabHorizontal, GoTrash, GoPencil } from "react-icons/go";
  
  const columns = [
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
      accessorKey: 'eca',
      header: 'ECA',
      cell: (props) => <p>{props.getValue().toString().toUpperCase()}</p>,
    },
    {
      accessorKey: 'admissionYear',
      header: 'Admission Year',
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'gradeSection',
      header: 'Grade Section',
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'idGrade',
      header: 'Grade',
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'idSchool',
      header: 'School',
      cell: (props) => <p>{props.getValue()?.idSchool}</p>,
    },
    {
      id: 'actions',
      cell: (props) => {
        return (
        <Menu  m="auto" zIndex="dropdown"> 
            <MenuButton
              bg={'transparent'}
              as={IconButton}
              aria-label='Options'
              icon={<GoKebabHorizontal size={'18px'} />}
              variant='outline'
              boxSize={25}
            />
            <MenuList borderRadius="10px" border="1px solid #CBD5E0" zIndex='20'>
              <MenuItem icon={<GoPencil size={'18px'} />}>
                Edit Element
              </MenuItem>
              <MenuItem icon={<GoTrash size={'18px'} />}>
                Delete Element
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    },
  ];
  
  export default columns;
  