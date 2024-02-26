const columns = [
    {
        accessorKey: 'gender',
        header: 'Gender',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'fullName',
        header: 'Full Name',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'age',
        header: 'Age',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'eca',
        header: 'ECA',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'admissionYear',
        header: 'Admission Year',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'gradeSection',
        header: 'Grade Section',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'idGrade',
        header: 'Grade',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'idSchool',
        header: 'School',
        cell: (props) => <p>{props.getValue()?.idSchool}</p>
    }
];

export default columns;