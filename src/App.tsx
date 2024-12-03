import React, {useState} from 'react';
import {TaskList, TaskType} from './components/taskList';
import {v1} from 'uuid';


const tasksBek = [
    {id: v1(), title: 'Купить морковку', completed: false},
    {id: v1(), title: 'Позвонить другу', completed: false},
    {id: v1(), title: 'Написать отчет', completed: true},
    {id: v1(), title: 'Пойти на пробежку', completed: true},
    {id: v1(), title: 'Прочитать конспект', completed: false}
];


export type FilterValue = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksBek)
    const [filteredTask, setFilteredTask] = useState<Array<TaskType>>(tasks)

    function changeCheckbox(id: string, completed: boolean) {

        let taskTemp = tasks.find(t => t.id === id);
        if (taskTemp) {
            taskTemp.completed = !completed
            setTasks([...tasks]);
        }

        // setTasks(prevTasks =>
        //     prevTasks.map(task =>
        //         task.id === id ? {  ...task, completed: !completed, } : task
        //     )
        // );
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            completed: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: FilterValue) {
        switch (value) {
            case 'completed':
                setFilteredTask(tasks.filter(t => t.completed))
                break
            case 'active':
                setFilteredTask(tasks.filter(t => !t.completed))
                break
            default:
                setFilteredTask(tasks)
        }
    }

    return (
        <div className="App">
            <h6>статус: -пока можно только жмякать CheckBox и добавлять задачки :) </h6>
            <TaskList title={'Мой список дел:'}
                      tasks={filteredTask}
                      changeCheckbox={changeCheckbox}
                      addTask={addTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
