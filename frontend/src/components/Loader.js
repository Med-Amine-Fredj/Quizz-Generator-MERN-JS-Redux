import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <>
        <Spinner animation='border' variant='info' role='status' style={{ margin: 'auto', display: 'block'}}>
            <span className='sr-only'> Loading ... </span>
        </Spinner>
        </>
    )
}

export default Loader
