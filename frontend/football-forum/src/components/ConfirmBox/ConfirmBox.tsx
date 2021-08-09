import React from 'react'

interface IProps {
    question: string
    accept: () => void
    discard: () => void
};

const ConfirmBox: React.FC<IProps> = (props) => {
    return (
        <div className="center confirm-box-container">
            <div>
                <span>{props.question}</span>
            </div>
            <div>
                <button className="button-discard" onClick={() => props.accept()}>Usuń</button>
                <button className="button-accept" onClick={() => props.discard()}>Anuluj</button>
            </div>
        </div>
    )
}

export default ConfirmBox;