import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import classNames from 'classnames';


export type TaskType = {
    id: string
    title: string
    completed: boolean
}

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeCheckbox: (id: string, completed: boolean) => void
    addTask: (title: string) => void
}

export const TaskList = (props: TaskListPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState('')

    const newTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTitleHandler = () => {

        if (!newTitle) {
            setError(' напиши что-нибудь...')
            setNewTitle('')
            return
        }

        if (props.tasks.some(t => t.title === newTitle)) {
            setError(' повторяешься :)')
            setNewTitle('')
            return
        } else {
            // добавить обрезание строки, если не влазивает!
            props.addTask(newTitle.trim())
            setNewTitle('')
            setError('')
        }
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.ctrlKey && e.key === 'Enter') {
            addTitleHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>

            <div className={'inputSave'}>
                <input className={classNames(error ? 'error' : '', 'inputValue')}
                       onChange={newTitleHandler}
                       value={newTitle}
                       placeholder={error ? error : ''}
                       onKeyUp={onPressHandler}/>

                <Button name={'добавить'}
                        onClick={addTitleHandler}/>
            </div>

            <div className={'filter-buttons'}>
                <Button name={'все'}/>
                <Button name={'выполнено'}/>
                <Button name={'не выполнено'}/>
            </div>

            <ul className={'checkBox'}>
                {props.tasks.map((t) => {

                    const onclickCheckedHandler = (id: string) => {
                        props.changeCheckbox(id, t.completed);
                    }

                    return (
                        <li className={'task'}
                            key={t.id}
                            onClick={() => {
                                onclickCheckedHandler(t.id)
                            }}>
                            <div>
                                <input type="checkbox"
                                       checked={t.completed}/>
                                <span className={t.completed ? 'completed' : ''}>{t.title}</span>
                            </div>
                            <button className={'buttonTask'}>x</button>

                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

