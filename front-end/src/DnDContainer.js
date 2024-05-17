import React from 'react';
import { useDrop } from 'react-dnd';
import TaskStack from './TaskStack';

const Container = ({ id, tasks }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => ({ id }),
  });

  return (
    <div ref={drop} style={{ background: getBackgroundColor(id), padding: '12px', borderRadius: '12px', minHeight: '400px' }}>
      <TaskStack type={id} tasks={tasks} />
    </div>
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

export { Container };
