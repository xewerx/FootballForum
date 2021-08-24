import React from 'react'

interface IProps {
    question: string
    id: string
    accept: () => void
    discard: (id: string) => void
};

const ConfirmBox: React.FC<IProps> = (props) => {
    return (
        <div className="center confirm-box-container" id={props.id}>
            <div>
                <span>{props.question}</span>
            </div>
            <div>
                <button className="button-discard" onClick={props.accept}>Usuń</button>
                <button className="button-accept" onClick={() => props.discard(props.id)}>Anuluj</button>
            </div>
        </div>
    )
}

export default ConfirmBox;