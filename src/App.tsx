import React, {useState} from 'react';
import {TaskList, TaskType} from './components/taskList';
import {v1} from 'uuid';


const tasksBack: TaskType[] = [
    {id: v1(), title: 'Первая задачка для примера', completed: false},
    {id: v1(), title: 'Вторая задачка для примера', completed: false},
    {id: v1(), title: 'Третья задачка для примера', completed: true},
    {id: v1(), title: 'Четвертая задачка для примера', completed: true},
    {id: v1(), title: 'Пятая задачка для примера', completed: false}
];


export type FilterValue = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksBack)
    const [filter, setFilter] = useState<FilterValue>('all')

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
        setFilter('all')
    }

    function changeFilter(value: FilterValue) {
        setFilter(value)
    }

    function deleteCompletedTasks() {
        setTasks(tasks.filter(task => !task.completed))
        setFilter('all')
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed
        if (filter === 'active') return !task.completed
        // if (filter === 'all') return true
        return true
    });

    return (
        <div className="App">
            <h6>статус: можно жмякать CheckBox и добавлять и удалять задачки :) </h6>
            <TaskList title={'Мой список дел:'}
                      tasks={filteredTasks}
                      tasksState={tasks}
                      changeCheckbox={changeCheckbox}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      deleteCompletedTasks={deleteCompletedTasks}
                      deleteTask={deleteTask}
                      filter={filter}/>
        </div>
    );
}

export default App;
