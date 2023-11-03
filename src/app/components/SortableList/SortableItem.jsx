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
function SortableItem({ children }) {
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
          className="drag-handle absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50"
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
        >
          {/* <svg viewBox="0 0 20 20" width="12">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg> */}
          <FontAwesomeIcon icon={faSort} aria-hidden="true" />
        </button>
        <div>
        <di className="sortable-component ">{children}</di>
        </div>
      </div>
    </SortableItemContext.Provider>
  );
}

export default SortableItem;
