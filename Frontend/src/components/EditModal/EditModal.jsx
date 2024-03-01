import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  theme,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import './EditModal.scss';
import { useFindById } from '../../hooks/api/useFindById';
import { useUpdate } from '../../hooks/api/useUpdate';

// Removing global styles from theme
delete theme.styles.global;

function EditModal({collectionName, isStudent, element, isOpen, onClose }) {
  const [fullName, setName] = useState('');
  const [age, setAge] = useState();
  const [gender, setGender] = useState('');
  const [school, setSchool] = useState('');
  const [eca, setECA] = useState(false);

  const {
    data,
    errorFindID,
    loadingFindID,
    findByID
  } = useFindById();

  const {
    resultUpdate,
    errorUpdate,
    loadingUpdate,
    updateDocument
  } = useUpdate();

  useEffect(() => {
    findByID(element, collectionName)
  }, [isOpen]);

  useEffect(() => {
    if(data){
      setName(data[0].fullName);
      setAge(data[0].age);
      setGender(data[0].gender);
      setSchool(data[0].idSchool);
      if(isStudent){
        setECA(data[0].eca);
      }
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      setECA(checked);
    } else {
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'age':
          setAge(value);
          break;
        case 'gender':
          setGender(value);
          break;
        case 'school':
          schools.map((school) => {
            if (value === school.idSchool) {
              setSchool(school);
            }
          })
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fullName || !age || !gender || !school) {
      alert('Please fill in all fields.');
      return;
    }

    let updatedElement = {}
    if (isStudent) {
      updatedElement = {
        ...data[0],
        fullName,
        age,
        gender,
        idSchool: school,
        eca,
      };
    } else {
        updatedElement = {
          ...data[0],
          fullName,
          age,
          gender,
          idSchool: school,
        };
    }

    updateDocument(element, updatedElement, collectionName)
    console.log('Updated')
    onClose();
  };

  const schools = [
    {
      idSchool: 'ETA_NY',
      location: {
        State: 'New York',
        City: 'New York',
        Street: '5th Avenue',
      },
    },
    {
      idSchool: 'ETA_CA',
      location: {
        State: 'California',
        City: 'Los Angeles',
        Street: 'Westwood Bou',
      },
    },
    {
      idSchool: 'ETA_IL',
      location: {
        State: 'Illinois',
        City: 'Chicago',
        Street: 'State Street',
      },
    },
  ];

  const options = schools.map((school) => school.idSchool);

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <h3>Edit Element</h3>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel marginTop='20px' fontSize='sm' color='#35373d' fontWeight='600'>
                  Full Name
                </FormLabel>
                <Input
                  name="name"
                  value={fullName}
                  onChange={handleChange}
                  fontFamily='inherit'
                  fontSize='sm'
                  placeholder='Full Name'
                  width='92%'
                  type='text'
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop='20px' fontSize='sm' color='#35373d' fontWeight='600'>
                  Age
                </FormLabel>
                <Input
                  name="age"
                  value={age}
                  onChange={handleChange}
                  min='5'
                  max='19'
                  fontFamily='inherit'
                  fontSize='sm'
                  placeholder='Age'
                  width='92%'
                  type='number'
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop='20px' fontSize='sm' color='#35373d' fontWeight='600'>
                  Gender
                </FormLabel>
                <Select
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  fontFamily='inherit'
                  fontSize='sm'
                  placeholder='Select gender'
                >
                  <option>M</option>
                  <option>F</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop='20px' fontSize='sm' color='#35373d' fontWeight='600'>
                  School
                </FormLabel>
                <Select
                  name="school"
                  value={school.idSchool}
                  onChange={handleChange}
                  fontFamily='inherit'
                  fontSize='sm'
                  placeholder='Select school'
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {isStudent && (
                <FormControl>
                  <FormLabel marginTop='20px' fontSize='sm' color='#35373d' fontWeight='600'>
                    Extracurricular Act.
                  </FormLabel>
                  <Checkbox name="eca" borderColor='#444' fontSize='sm' isChecked={eca} onChange={handleChange}>
                    ECA
                  </Checkbox>
                </FormControl>
              )}
              <ModalFooter>
                <Button type="submit" fontSize='14px'>Save</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default EditModal;