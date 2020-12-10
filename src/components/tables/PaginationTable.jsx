import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from '../../data/MOCK_DATA.json'
import { COLUMNS /*, GROUPED_COLUMNS */} from '../columns'
import '../../assets/css/table.css'

const PaginationTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    // const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
 

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Page replaces rows
        nextPage, // Helper functions for navigating pages. Add your own buttons
        previousPage, 
        canNextPage, // Booleans that indcate if you can move forward/backward or not
        canPreviousPage,
        pageOptions, // Page options for table instance
        gotoPage, // Helper function for jumping to specific page
        pageCount, 
        setPageSize, // Set amount of records to show on each page
        state, // Table state
        prepareRow
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 } // Page that is displayed on initial render
    }, usePagination) // Call usePagination

    // Destructure page index from state
    const { pageIndex, pageSize } = state

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
                    {/* Replace rows with page from table instance */}
                    {page.map(row => {
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
            </table>
            {/* Pagination buttons */}
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>{' '}
                <button onClick={previousPage} disabled={!canPreviousPage}>Previous</button>{' '}
                <span>
                    {' '}Page{' '}
                    <strong>
                        {/* page number of total page numbers */}
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go To Page: {' '}
                    <input 
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{width: '50px'}}
                    />
                </span>{' '}
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
                    {[10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>{' '}
                <button onClick={nextPage} disabled={!canNextPage}>Next</button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>{' '}
            </div>
        </>
    )
}


export default PaginationTable