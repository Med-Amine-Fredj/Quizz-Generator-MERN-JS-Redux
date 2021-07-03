import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

const Message = ({variant, children}) => {

    const [show, setShow] = useState(true);

    return (
        <>
        <Alert variant={variant} show={show}>
            {children}
             <div className="d-flex justify-content-end ">
                <Button onClick={() => setShow(false)} variant="outline-dark " >
                    Cacher Message
                </Button>
            </div>
        </Alert>
        {!show && <Button onClick={() => setShow(true)} className='m-4' size='sm '>Afficher Message</Button>}
        </>
    )
}

Message.defaultProps = {
    variant: 'info',
}

export default Message
