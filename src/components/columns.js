import { format } from 'date-fns'
// import ColumnFilter from './filters/ColumnFilter'

// Flat array, no header groups:
export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        // Filter: ColumnFilter, // Column filter component
        disableFilters: true, // This HAS to be called if you don't want a column filter on specific column.
        sticky: 'left',
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        sticky: 'left',
        // Filter: ColumnFilter
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        sticky: 'left',
        // Filter: ColumnFilter
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
        // Formatting date time from ISO:
        // Destructure the DOB value from the data object:
        Cell: ({ value }) => {
            // Make sure the value is a DateTime object
            // and format it:
            return format(new Date(value), 'dd/MM/yyyy')
        },
        // Filter: ColumnFilter
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
        // Filter: ColumnFilter
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
        // Filter: ColumnFilter
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Age',
        Footer: 'Age',
        accessor: 'age',
    }
]

// Array with header groups:
export const GROUPED_COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name'
            },
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Date of Birth',
                Footer: 'Date of Birth',
                accessor: 'date_of_birth'
            },
            {
                Header: 'Country',
                Footer: 'Country',
                accessor: 'country'
            },
            {
                Header: 'Phone',
                Footer: 'Phone',
                accessor: 'phone'
            },
        ]
    },
]

 