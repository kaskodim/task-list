import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {FilterValue} from '../App';


export type TaskType = {
    id: string
    title: string
    completed: boolean
}
type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    tasksState: Array<TaskType>
    changeCheckbox: (id: string, completed: boolean) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValue) => void
    deleteCompletedTasks: () => void
    deleteTask: (id: string) => void
    filter: FilterValue
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

        if (props.tasksState.some(t => t.title === newTitle)) {
            setError(' повторяешься :)')
            setNewTitle('')
            return
        } else {
            // TODO добавить обрезание строки, если не влазивает!
            props.addTask(newTitle.trim())
            props.changeFilter('all')
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
                <input className={`inputValue ${error ? 'error' : ''}`}
                       onChange={newTitleHandler}
                       value={newTitle}
                       placeholder={error ? error : ''}
                       onKeyUp={onPressHandler}/>

                <Button name={'добавить'}
                        onClick={addTitleHandler}

                    // TODO скидывать фильтр на все или не выполненные

                />
            </div>

            <div className={'filter-buttons'}>
                <Button className={props.filter === 'all' ? 'buttonActive' : ''}
                        name={'все'}
                        onClick={() => {
                            props.changeFilter('all')
                        }}/>
                <Button className={props.filter === 'completed' ? 'buttonActive' : ''}
                        name={'выполнено'} onClick={() => {
                    props.changeFilter('completed')
                }}/>
                <Button className={props.filter === 'active' ? 'buttonActive' : ''}
                        name={'не выполнено'} onClick={() => {
                    props.changeFilter('active')
                }}/>


            </div>

            <ul className={'checkBox'}>
                {
                    props.tasks.length === 0 ? (
                        <p>дела не добавлены</p>
                    ) : (

                        props.tasks.map((t) => {
                            const onclickCheckedHandler = (id: string) => {
                                props.changeCheckbox(id, t.completed);
                            }

                            return (
                                <li className={'task'}
                                    key={t.id}>
                                    <label htmlFor={t.id}>
                                        <input id={t.id} type="checkbox"
                                               checked={t.completed}
                                               onChange={() => {
                                                   onclickCheckedHandler(t.id)
                                               }}
                                        />
                                        <span className={t.completed ? 'completed' : ''}>{t.title}</span>
                                    </label>
                                    <button className={'buttonTask'}
                                            onClick={() => {
                                                props.deleteTask(t.id)
                                            }}>x
                                    </button>
                                </li>
                            )
                        })
                    )
                }
            </ul>
            <Button name={'удалить выполненные'} onClick={props.deleteCompletedTasks}/>
        </div>
    );
};

