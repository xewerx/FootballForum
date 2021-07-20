import React from 'react'

type IProps = {
    variant: string
    children: string
}
const MessageBox: React.FC<IProps> = (props) => {  // props.children - wartosc podana w komponencie - bezposrednio miedzy tagami
    return (
        <div className={`alert alert-${props.variant || 'info'}`}> 
            {props.children} 
        </div>
    )
}

export default MessageBox;