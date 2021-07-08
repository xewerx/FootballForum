import React from 'react'

type propsType = {
    variant: string
    children: string
}
function MessageBox(props: propsType) { // props.children - wartosc podana w komponencie - bezposrednio miedzy tagami
    return (
        <div className={`alert alert-${props.variant || 'info'}`}> 
            {props.children} 
        </div>
    )
}

export default MessageBox;