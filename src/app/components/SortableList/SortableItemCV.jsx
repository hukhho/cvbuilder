'use client';

import { createContext, useContext, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragOutlined } from '@ant-design/icons';
import './SortableItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref() {},
});
function SortableItemCV({ children }) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setDraggableNodeRef,
    setActivatorNodeRef,
  } = useSortable({
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
      <div className="sortable-list relative group" ref={setNodeRef} style={style} {...attributes}>
        <button
          className="drag-handle absolute left-[-15px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50"
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
        >
          <FontAwesomeIcon icon={faSort} aria-hidden="true" />
        </button>
        <div>
          <div className="sortable-component ">{children}</div>
        </div>
      </div>
    </SortableItemContext.Provider>
  );
}

export default SortableItemCV;
