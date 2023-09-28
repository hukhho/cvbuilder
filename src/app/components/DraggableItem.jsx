'use client';

import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableItem = ({ index, onItemDrag, moveItem, children }) => {
  const [isHovered, setIsHovered] = useState(false); // Add state for hover

  const [{ isDragging }, ref] = useDrag({
    type: 'ITEM',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: draggedItem => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        opacity: isDragging ? 0.5 : 1,
        width: '100%',
        backgroundColor: isDragging ? 'lightblue' : 'white',
      }}
      onMouseEnter={() => setIsHovered(true)} // Handle hover state
      onMouseLeave={() => setIsHovered(false)} // Handle hover state
    >
      <div ref={node => ref(drop(node))} style={{ cursor: 'grab', marginRight: '8px' }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableItem;
