import React from 'react';
import './styles.css'

type ModalPropsType = {
    isOpen: boolean;
    closeModal?: () => void
    confirmDelete?: () => void
}


export const ModalDeleteTask = (props: ModalPropsType) => {
    if (!props.isOpen) return null
    return (

        <div className="modal">
            <button className="close"
                    onClick={props.closeModal}>x
            </button>
            <span>удалить текущую задачу?</span>
            <div className={'modal-button'}>
                <button onClick={props.confirmDelete}>Удалить</button>
                <button onClick={props.closeModal}>Отмена</button>
            </div>

        </div>
    );
};
