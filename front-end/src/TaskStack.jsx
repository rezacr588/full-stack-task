import Task from "./Task";
import { Draggable } from 'react-beautiful-dnd';

const TaskStack = (props) => {
  const { type, tasks } = props;

  return (
    <div
      style={{
        padding: "12px",
        gap: 12,
        display: "grid",
        borderRadius: 12,
      }}
    >
      <p style={{
        fontSize: '16px',
        lineHeight: "20.8px",
        fontWeight: 500,
      }}>
        {type}
      </p>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Task
                key={task.id}
                text={task.text}
                status={task.status}
                createdAt={task.createdAt}
                state={task.state}
                id={task.id}
                category={task.category}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

export default TaskStack;
