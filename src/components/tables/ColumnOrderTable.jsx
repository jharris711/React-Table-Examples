import React, { useMemo } from 'react'
import { useTable, useColumnOrder } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import '../../assets/css/table.css'

const ColumnOrderTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
 

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, 
        prepareRow,
        setColumnOrder, // Deconstruct from useColumnOrder
    } = useTable({
        columns,
        data,
    }, useColumnOrder) 

    const changeOrder = () => {
        // Call setColumnOrder and pass an array of
        // accessors from columns in the desired order
        setColumnOrder([
            'id',
            'first_name',
            'last_name',
            'phone',
            'country',
            'date_of_birth',
        ])
    }

    return (
        <>
            {/* On click, change column order */}
            <button onClick={changeOrder}>Change column order</button>
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


export default ColumnOrderTable 