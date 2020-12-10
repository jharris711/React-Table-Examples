import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import GlobalFilter from '../filters/GlobalFilter'

import '../../assets/css/table.css'
import ColumnFilter from '../filters/ColumnFilter'

const FilteringTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    // const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    // Use this instead of adding the 
    // filter to every column manually:
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])
 
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, 
        prepareRow,
        state, // Table state
        setGlobalFilter, // setGlobalFilter function
    } = useTable({
        columns,
        data,
        defaultColumn // add defaultCloumn here in table instance
    }, 
    useFilters, // Column filters
    useGlobalFilter) // Global filter

    // Destructure globalFilter from state from table instance
    const { globalFilter } = state

    return (
        <>  
            {/* Global filter with 2 params from table instance */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                        {/* Render Filter from column object (see COLUMNS) */}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
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


export default FilteringTable