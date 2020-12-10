import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'


const GlobalFilter = ({ filter, setFilter }) => {
    // Set filter value to state hook:
    const [value, setValue] = useState(filter)

    // useAsyncDebounce helps with larger sets of data:
    // On change, use useAsyncDebounce hook from React-Table:
    const handleOnChange = useAsyncDebounce(value => {
        // Set filter value equal to updated value or undefined:
        setFilter(value || undefined)
        // After 500ms (.5 secs) has passed since last change event:
    }, 500)

    return (
        <span>
            Search: {' '}
            <input 
                value={value || ''}
                onChange={e => {
                    setValue(e.target.value)
                    handleOnChange(e.target.value)
                }} 
            />
        </span>
    )
}

export default GlobalFilter