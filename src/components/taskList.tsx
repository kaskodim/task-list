import React from 'react';
import { Button } from './Button';
import { FilterValue } from '../App';
import { AddForm } from './AddForm';

export type TaskType = {
    id: string;
    title: string;
    completed: boolean;
};

type TaskListPropsType = {
    tasksListId: string;
    title: string;
    tasks: Array<TaskType>;
    tasksState: { [tasksListId: string]: Array<TaskType> };
    changeCheckbox: (tasksListId: string, id: string, completed: boolean) => void;
    addTask: (tasksListId: string, title: string) => void;
    changeFilter: (value: FilterValue, id: string) => void;
    deleteCompletedTasks: (tasksListId: string) => void;
    deleteTask: (id: string, tasksListId: string) => void;
    filter: FilterValue;
    deleteTaskList: (tasksListId: string) => void;
};

export const TaskList = (props: TaskListPropsType) => {
    const deleteTaskList = () => {
        props.deleteTaskList(props.tasksListId);
    };

    const addTask = (title: string) => {
        props.addTask(props.tasksListId, title);
    };

    return (
        <div>
            <Button name={'x'} onClick={deleteTaskList} className={'buttonDeleteTaskList'} />

            <div className={'taskListHeader'}>
                <h3>{props.title}</h3>
            </div>

            <AddForm addItem={addTask} />

            <div className={'filter-buttons'}>
                <Button
                    className={props.filter === 'all' ? 'buttonActive' : ''}
                    name={'все'}
                    onClick={() => {
                        props.changeFilter('all', props.tasksListId);
                    }}
                />
                <Button
                    className={props.filter === 'completed' ? 'buttonActive' : ''}
                    name={'выполнено'}
                    onClick={() => {
                        props.changeFilter('completed', props.tasksListId);
                    }}
                />
                <Button
                    className={props.filter === 'active' ? 'buttonActive' : ''}
                    name={'не выполнено'}
                    onClick={() => {
                        props.changeFilter('active', props.tasksListId);
                    }}
                />
            </div>

            <ul className={'checkBox'}>
                {props.tasks.length === 0 ? (
                    <p>дела не добавлены или выполнены</p>
                ) : (
                    props.tasks.map((t) => {
                        const onclickCheckedHandler = (id: string) => {
                            props.changeCheckbox(props.tasksListId, id, t.completed);
                        };

                        return (
                            <li className={'task'} key={t.id}>
                                <label htmlFor={t.id}>
                                    <input
                                        id={t.id}
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => {
                                            onclickCheckedHandler(t.id);
                                        }}
                                    />
                                    <span className={t.completed ? 'completed' : ''}>{t.title}</span>
                                </label>
                                <button
                                    className={'buttonTask'}
                                    onClick={() => props.deleteTask(t.id, props.tasksListId)}
                                >
                                    x
                                </button>
                            </li>
                        );
                    })
                )}
            </ul>

            {props.filter === 'all' || props.filter === 'completed' ? (
                <Button
                    name={'удалить выполненные'}
                    onClick={() => {
                        props.deleteCompletedTasks(props.tasksListId);
                    }}
                />
            ) : (
                ''
            )}
        </div>
    );
};
