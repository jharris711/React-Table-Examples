import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import '../../assets/css/table.css'

const BasicTable = () => {

    // Memoize columns and data with React useMemo hook:
    const columns = useMemo(() => COLUMNS, [])
    // const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
 

    // Destructure methods from React-Table 
    // useTable Hook. These will also
    // be destructred in the JSX:
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
    })

    return (
        // Destructure table props in table tag:
        <table {...getTableProps()}>
            <thead>
                {/* Map out headerGroups to gain access to 
                individual header group*/}
                {headerGroups.map(headerGroup => (
                    // Destructure header props:
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {/* Map out header columns: */}
                        {headerGroup.headers.map(column => {
                            // Destructure header props and render table header columns:
                            return (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            {/* Detructure table body props: */}
            <tbody {...getTableBodyProps()}>
                {/* Create rows: */}
                {/* Map out rows to gain access to individual row: */}
                {rows.map(row => {
                    // Call prepareRow on each the row:
                    prepareRow(row)
                    return ( 
                        // Destructure row props in table row tag:
                        <tr {...row.getRowProps()}>
                            {
                                // Map out cells from row:
                                row.cells.map(cell => {
                                    // Destructure cell props and render cell:
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
    )
}


export default BasicTable 