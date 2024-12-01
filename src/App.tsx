import React, {useState} from 'react';
import {TaskList, TaskType} from './components/taskList';
import {v1} from 'uuid';


const tasksBek = [
    {id: v1(), title: 'Купить мороковку', completed: false},
    {id: v1(), title: 'Позвонить другу', completed: false},
    {id: v1(), title: 'Написать отчет', completed: true},
    {id: v1(), title: 'Не пойти на пробежку', completed: true},
    {id: v1(), title: 'Прочитать конеспект', completed: false}
];


function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksBek)


    function changeCheckbox(id: string, completed: boolean) {

        let taskTemp = tasks.find(t => t.id === id);
        if (taskTemp) {
            taskTemp.completed = !completed
            setTasks([...tasks]);
        }


        // setTasks(prevTasks =>
        //     prevTasks.map(task =>
        //         task.id === id ? { ...task, completed: !completed } : task
        //     )
        // );
    }

    return (
        <div className="App">
            <h6>статус: Пока можно только жмякать CheckBox :) </h6>
            <TaskList title={'Мой список дел:'}
                      tasks={tasks}
                      changeCheckbox={changeCheckbox}/>
        </div>
    );
}

export default App;
