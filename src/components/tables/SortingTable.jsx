import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import '../../assets/css/table.css'

const SortingTable = () => {
    // Basically the same as BasicTable.
    // Only Sorting changes will be commented.

    const columns = useMemo(() => COLUMNS, [])
    // const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
 

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, 
        prepareRow
    } = useTable({
        columns,
        data,
    },
    // Call useSortBy as part of the 
    // useTable instance/hook:
    useSortBy)

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                            return (
                                // add column.getSortByToggleProps() as param
                                // for getHeaderProps:
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* If column is sorted, display an icon 
                                    showing how it is sorted. Otherwise, 
                                    show an empty string */}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                    </span>
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
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
    )
}


export default SortingTable 