import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import Checkbox from '../Checkbox'
import '../../assets/css/table.css'

const ColumnHidingTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
 

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, 
        prepareRow,
        allColumns, // Array of all columns supplied to the table
        getToggleHideAllColumnsProps, // Method that allows you to hide or show all columsn at once
    } = useTable({
        columns,
        data,
    })

    return (
        <>
            <div>
                <div>
                    {/* Show/hide all checkbox toggle */}
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {/* To show/hide individual columns: */}
                {
                    // Map through all columns:
                    allColumns.map(column => (
                        // Pass column id to div key:
                        <div key={column.id}>
                            <label>
                                {/* Deconstruct the show/hide toggle function from column */}
                                <input 
                                    type='checkbox'
                                    {...column.getToggleHiddenProps()}
                                />
                                {/* Use column header as label */}
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
            </div>
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
                    {rows.map(row => {
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
        </>
    )
}


export default ColumnHidingTable 