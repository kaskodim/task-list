import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';

export type AddFormPropsType = {
    addItem: (title: string) => void;
};

export function AddForm(props: AddFormPropsType) {
    const [error, setError] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const newTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTitleHandler();
        }
    };

    const addTitleHandler = () => {
        if (!newTitle) {
            setError('напиши что-нибудь...');
            setNewTitle('');
            return;
        }

        // TODO добавить обрезание строки, если не влазивает!
        props.addItem(newTitle.trim());
        setNewTitle('');
        setError('');
    };

    return (
        <div className={'inputSave'}>
            <input
                className={`inputValue ${error ? 'error' : ''}`}
                onChange={newTitleHandler}
                value={newTitle}
                placeholder={error ? error : ''}
                onKeyUp={onPressHandler}
            />
            <Button name={'добавить'} onClick={addTitleHandler} />
        </div>
    );
}
