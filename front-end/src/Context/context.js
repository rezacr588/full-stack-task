import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [descriptionEdit, setDescriptionEdit] = useState('');
  const [categoryEdit, setCategoryEdit] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    label: 'Engineering',
    value: 'Engineering',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteAllTasks = () => {
    fetch('http://localhost:3000/tasks', {
      method: 'DELETE',
    })
      .then(() => {
        fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(data => setTasks(data));
      });
  }

  const openEditModal = (task) => {
    setDescriptionEdit(task.text);
    setCategoryEdit(task.category);
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleEditSelect = (option) => {
    setCategoryEdit(option);
  }

  const addTask = () => {
    const newTask = {
      description: description,
      status: 'To Do',
      category: selectedOption.value,
      id: uuidv4(),
      createdAt: new Date(),
    };
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .then(() => {
        setDescription('');
        setSelectedOption(
          {
            label: 'Engineering',
            value: 'Engineering',
          }
        );
        closeModal();
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(data => setTasks(data));
      });
  };

  const updatedTask = (id, state) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ state: state })
    })
      .then(response => response.json())
      .then(data => setTasks(data));
  };

  const editTask = () => {
    fetch(`http://localhost:3000/tasks/${selectedTask.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          text: descriptionEdit,
          category: categoryEdit.value
        }
      )
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .then(() => {
        setDescriptionEdit('');
        setCategoryEdit('');
        setSelectedTask(null);
        closeEditModal();
      });
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);
    fetch(`http://localhost:3000/tasks/${draggableId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          status: destination.droppableId[0]
        }
      )
    })
      .then(response => response.json())
      .then(data => setTasks(data));
  }

  const searchTask = (value) => {
    fetch(`http://localhost:3000/tasks?search=${value}`)
      .then(response => response.json())
      .then(data => setTasks(data));
  }

  return (
    <TasksContext.Provider value={{ 
      tasks, 
      setTasks, 
      description, 
      setDescription,
      onDragEnd,
      addTask, 
      deleteTask, 
      updatedTask, 
      descriptionEdit, 
      setDescriptionEdit, 
      categoryEdit, 
      setCategoryEdit, 
      selectedOption, 
      setSelectedOption, 
      editTask,
      handleSelect,
      handleEditSelect,
      openModal,
      closeModal,
      isModalOpen,
      openEditModal,
      closeEditModal,
      isEditModalOpen,
      deleteAllTasks,
      selectedTask,
      searchTask
     }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}