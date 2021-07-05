import React, { useState, useEffect } from 'react'

const Message = ({variant, children}) => {

            const [show, setShow] = useState(true);

            useEffect(() => {
                const timeId = setTimeout(() => {
                    setShow(false)
                }, 2000)
                return () => {
                    clearTimeout(timeId)
                }
                }, []);
                if(!show) {
                    return null;
                    }
            return (
                <>

                  <div className={`alert alert-${variant}`}>
                {children}
                </div>
                    {/* <Alert variant={variant} show={show}>
            {children}
             <div className="d-flex justify-content-end ">
                <Button onClick={() => setShow(false)} variant="outline-dark " >
                    Cacher Message
                </Button>
            </div>
        </Alert>
        {!show && <Button onClick={() => setShow(true)} className='m-4' size='sm '>Afficher Message</Button>}
        */} 
        </>
    )
}

Message.defaultProps = {
    variant: 'info',
}

export default Message
