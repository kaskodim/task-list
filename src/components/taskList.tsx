import React from 'react';
import {Button} from './Button';


export type TaskType = {
    id: string
    title: string
    completed: boolean
}

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeCheckbox: (id: string, completed: boolean) => void
}

export const TaskList = (props: TaskListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>

            <div className={'inputSave'}>
                <input/>
                <Button name={'сохранить'}/>
            </div>

            <div>
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
                        <li key={t.id}
                            onClick={() => {
                                onclickCheckedHandler(t.id)
                            }}>
                            <input type="checkbox"
                                   checked={t.completed}/>
                            {t.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

