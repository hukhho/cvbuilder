'use client';

import { createContext, useContext, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragOutlined } from '@ant-design/icons';
import './SortableItem.css';

const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref() {},
});
function SortableItem({ children }) {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition, setDraggableNodeRef, setActivatorNodeRef } = useSortable({
    id: children,
    transition: {
      duration: 150, // milliseconds
    },
  });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li className="sortable-item" ref={setNodeRef} style={style} {...attributes}>
        <button className="DragHandle" {...attributes} {...listeners} ref={setActivatorNodeRef}>
          <svg viewBox="0 0 20 20" width="12">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </button>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export default SortableItem;

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  console.log('🚀 ~ file: SortableItem.jsx:48 ~ DragHandle ~ ref:', ref);

  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
    </button>
  );
}
