import { useDrag, useDrop } from 'react-dnd';

const DraggableItem = ({ index, onItemDrag, moveItem, children }) => {
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
    <div ref={node => ref(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableItem;
