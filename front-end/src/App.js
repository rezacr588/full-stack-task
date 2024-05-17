import React from 'react';
import Layout from './Layout';
import './App.css';
import TaskStack from './TaskStack';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Modal from './Modal';
import Dropdown from './Dropdown';
import { useTasksContext } from './context';

const App = () => {
  const {
    handleSelect,
    description,
    tasks,
    openModal,
    closeModal,
    isModalOpen,
    isEditModalOpen,
    closeEditModal,
    handleEditSelect,
    setDescription,
    setDescriptionEdit,
    editTask,
    descriptionEdit,
    addTask,
    onDragEnd,
    categoryEdit
  } = useTasksContext();

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const options = [
    { value: 'Web Design', label: 'Web Design' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Operations', label: 'Operations' },
  ];

  console.log(descriptionEdit, categoryEdit);

  return (
    <Layout>
      <div className='flex justify-between mb-5'>
        <h3 style={{
          fontSize: '31px',
          lineHeight: '40.3px',
          fontWeight: 500,
          color: "#3D3D3D",
          margin: 0,
          padding: 0
        }}>Tasks</h3>
        <button style={{
          background: '#2563DC',
          padding: '8px 32px',
          borderRadius: 8,
          color: 'white',
          display: 'flex',
          width: 172,
          gap: 10,
          lineHeight: '24px',
        }}
          onClick={openModal}
        >
          New task
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 4.25C12.9142 4.25 13.25 4.58579 13.25 5V19C13.25 19.4142 12.9142 19.75 12.5 19.75C12.0858 19.75 11.75 19.4142 11.75 19V5C11.75 4.58579 12.0858 4.25 12.5 4.25Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M4.75 12C4.75 11.5858 5.08579 11.25 5.5 11.25H19.5C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H5.5C5.08579 12.75 4.75 12.4142 4.75 12Z" fill="white" />
          </svg>
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
          borderRadius: 12,
        }}>
          <Droppable key={"To Do"} droppableId={["To Do"]}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ background: getBackgroundColor("To Do"), padding: '12px', borderRadius: '12px', minHeight: '400px' }}
                >
                  <TaskStack type={"To Do"} tasks={getTasksByStatus("To Do")} />
                  {provided.placeholder}
                </div>
              )}
          </Droppable>
          <Droppable key={"In Progress"} droppableId={["In Progress"]}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ background: getBackgroundColor("In Progress"), padding: '12px', borderRadius: '12px', minHeight: '400px' }}
              >
                <TaskStack type={"In Progress"} tasks={getTasksByStatus("In Progress")} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable key={"Ready for Review"} droppableId={["Ready for Review"]}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ background: getBackgroundColor("Ready for Review"), padding: '12px', borderRadius: '12px', minHeight: '400px' }}
              >
                <TaskStack type={"Ready for Review"} tasks={getTasksByStatus("Ready for Review")} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <Modal title="Create New Task" isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-2 flex justify-between">
          <h2 style={{
            fontSize: "13px",
            lineHeight: "19.5px",
            fontWeight: 300,
            color: "rgba(79, 79, 79, 1)"
          }}>Category</h2>
          <Dropdown options={options} onSelect={handleSelect} selected={
            'Select a category'
          } />
        </div>
        <textarea placeholder='Description . . .' value={description} onChange={(e) => {
          setDescription(e.target.value);
        }} style={{
          fontSize: "13px",
          fontWeight: 500,
          lineHeight: "19.5px",
          borderRadius: "8px",
          padding: "16px",
          gap: "20px",
          border: "0.8px solid rgba(47, 128, 237, 1)",
          boxShadow: "0px 4px 6px 3px rgba(45, 83, 219, 0.1)",
          width: "100%",
        }} />
        <button style={{
          background: "rgba(47, 128, 237, 1)",
          borderRadius: "8px",
          width: "100%",
          height: "60px",
          color: "white",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: "19.5px",
        }}
          onClick={addTask}>
          Create Task
        </button>
      </Modal>
      <Modal title="Edit Task" isOpen={isEditModalOpen} onClose={closeEditModal}>
        <div className="p-2 flex justify-between">
          <h2 style={{
            fontSize: "13px",
            lineHeight: "19.5px",
            fontWeight: 300,
            color: "rgba(79, 79, 79, 1)"
          }}>Category</h2>
          <Dropdown options={options} onSelect={handleEditSelect} selected={categoryEdit}  />
        </div>
        <textarea placeholder='Description . . .' defaultValue={descriptionEdit} value={descriptionEdit} onChange={(e) => {
          setDescriptionEdit(e.target.value);
        }} style={{
          fontSize: "13px",
          fontWeight: 500,
          lineHeight: "19.5px",
          borderRadius: "8px",
          padding: "16px",
          gap: "20px",
          border: "0.8px solid rgba(47, 128, 237, 1)",
          boxShadow: "0px 4px 6px 3px rgba(45, 83, 219, 0.1)",
          width: "100%",
        }} />
        <button style={{
          background: "rgba(47, 128, 237, 1)",
          borderRadius: "8px",
          width: "100%",
          height: "60px",
          color: "white",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: "19.5px",
        }}
          onClick={editTask}>
          Save Task
        </button>
      </Modal>
    </Layout>
  );
};

const getBackgroundColor = (type) => {
  switch (type) {
    case 'To Do':
      return '#EAEAEA';
    case 'In Progress':
      return '#FFF6EB';
    case 'Ready for Review':
      return 'rgba(33, 150, 83, 0.15)';
    default:
      return '#EAEAEA';
  }
};

export default App;
