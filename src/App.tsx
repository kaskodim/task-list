import React, { useState } from 'react';
import { TaskList } from './components/taskList';
import { v1 } from 'uuid';
import { ModalDeleteTask } from './components/modalDeleteTask/ModalDeleteTask';
import { AddForm } from './components/AddForm';

export type FilterValue = 'all' | 'completed' | 'active';
type TaskListType = {
    id: string;
    title: string;
    filter: FilterValue;
};

function App() {
    const taskListId1 = v1();
    const taskListId2 = v1();

    const [taskLists, setTaskLists] = useState<Array<TaskListType>>([
        { id: taskListId1, title: 'Первый список дел', filter: 'all' },
        { id: taskListId2, title: 'Второй список дел', filter: 'all' },
    ]);

    const [tasks, setTasks] = useState({
        [taskListId1]: [
            { id: v1(), title: 'Первая задачка для примера', completed: false },
            { id: v1(), title: 'Вторая задачка для примера', completed: false },
            { id: v1(), title: 'Третья задачка для примера', completed: true },
            { id: v1(), title: 'Четвертая задачка для примера', completed: true },
            { id: v1(), title: 'Пятая задачка для примера', completed: false },
        ],
        [taskListId2]: [
            { id: v1(), title: 'Купить молоко', completed: false },
            { id: v1(), title: 'Купить хлеб', completed: false },
            { id: v1(), title: 'Купить яйца 10шт', completed: true },
            { id: v1(), title: 'Купить масло', completed: true },
            { id: v1(), title: 'Купить помидоры', completed: false },
        ],
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [idTaskToDelete, setIdTaskToDelete] = useState<{ id: string; tasksListId: string } | null>(null);

    function changeCheckbox(tasksListId: string, id: string, completed: boolean) {
        const arrTasks = tasks[tasksListId];
        const filteredArray = arrTasks.find((t) => t.id === id);
        if (filteredArray) {
            filteredArray.completed = !completed;
            setTasks({ ...tasks, [tasksListId]: arrTasks });
        }
    }

    function addTask(tasksListId: string, title: string) {
        const newTask = {
            id: v1(),
            title: title,
            completed: false,
        };
        const arrTasks = tasks[tasksListId];
        const updatedArray = [newTask, ...arrTasks];
        setTasks({ ...tasks, [tasksListId]: updatedArray });
    }

    function deleteCompletedTasks(tasksListId: string) {
        const arrTasks = tasks[tasksListId];
        setTasks({ ...tasks, [tasksListId]: arrTasks.filter((task) => !task.completed) });
    }

    function deleteTask(id: string, tasksListId: string) {
        setIsModalOpen(true);
        setIdTaskToDelete({ id, tasksListId });
    }

    function closeModal() {
        setIsModalOpen(false);
        setIdTaskToDelete(null);
    }

    function confirmDelete() {
        if (idTaskToDelete) {
            const { id, tasksListId } = idTaskToDelete;
            setTasks((prevTasks) => {
                const updatedTasks = prevTasks[tasksListId].filter((task) => task.id !== id);
                return { ...prevTasks, [tasksListId]: updatedTasks };
            });
        }

        setIdTaskToDelete(null);
        setIsModalOpen(false);
    }

    function changeFilter(value: FilterValue, taskListId: string) {
        const taskList = taskLists.find((t) => t.id === taskListId);
        if (taskList) {
            taskList.filter = value;
            setTaskLists([...taskLists]);
        }
    }

    function deleteTaskList(tasksListId: string) {
        const filteredTasksList = taskLists.filter((t) => t.id !== tasksListId);
        setTaskLists(filteredTasksList);

        delete tasks[tasksListId];
        setTasks({ ...tasks });
    }

    function addTaskList(title: string) {
        const newTaskList: TaskListType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTaskLists([...taskLists, newTaskList]);
        setTasks({
            ...tasks,
            [newTaskList.id]: [] });
    }

    return (
        <>
            <div className={'taskList'}>
                <AddForm addItem={addTaskList} />
            </div>

            <div className={'taskLists'}>
                {taskLists.map((tl) => {
                    const filteredTasks = tasks[tl.id].filter((task) => {
                        if (tl.filter === 'completed') return task.completed;
                        if (tl.filter === 'active') return !task.completed;
                        return true;
                    });

                    return (
                        <div className="taskList" key={tl.id}>
                            <TaskList
                                tasksListId={tl.id}
                                title={tl.title}
                                tasks={filteredTasks}
                                tasksState={tasks}
                                changeCheckbox={changeCheckbox}
                                addTask={addTask}
                                changeFilter={changeFilter}
                                deleteCompletedTasks={deleteCompletedTasks}
                                deleteTask={deleteTask}
                                filter={tl.filter}
                                deleteTaskList={deleteTaskList}
                            />
                            <ModalDeleteTask
                                isOpen={isModalOpen}
                                closeModal={closeModal}
                                confirmDelete={confirmDelete}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
