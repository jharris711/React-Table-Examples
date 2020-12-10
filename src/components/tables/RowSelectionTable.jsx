import React, { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import Checkbox from '../Checkbox'
import '../../assets/css/table.css'

const RowSelectionTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
 
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, 
        prepareRow,
        selectedFlatRows, // Gives flat array of rows that are currently selected in table
    } = useTable({
        columns,
        data,
    }, useRowSelect, // Call useRowSelect as 2nd arg
    hooks => { // Function call right after useRowSelect:
        // Create selction column in table:
        hooks.visibleColumns.push((columns) => {
            return [
                {
                    id: 'selection', // Column id
                    // Toggle all rows checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    // Individual checkbox
                    Cell: ({ row }) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]
        })
    }
    ) // Call useRowSelect

    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => {
                        return <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => {
                                return <td {...column.getFooterProps()}>
                                    {column.render('Footer')}
                                </td>
                            })}
                        </tr>
                    })}
                </tfoot>
            </table>
            {/* String showing array in action */}
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map(row => row.original),
                        }
                    )}
                </code>
            </pre>
        </>
    )
}


export default RowSelectionTable 