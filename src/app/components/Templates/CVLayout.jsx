/* eslint-disable no-shadow */

import { useCallback, useState } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import DraggableItem from '../DraggableItem';
import './CVTemplates.scss';
import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortableItem, { DragHandle } from '../SortableList/SortableItem';

const CVLayout = ({ children }) => {
  console.log('🚀 ~ file: CVLayout.jsx:14 ~ CVLayout ~ children:', children);
  // const [components, setComponents] = useState(children);
  // const moveItem = (fromIndex, toIndex) => {
  //   console.log('🚀 ~ file: CVLayout.jsx:19 ~ moveItem ~ toIndex:', toIndex);
  //   console.log('🚀 ~ file: CVLayout.jsx:19 ~ moveItem ~ fromIndex:', fromIndex);
  //   const newComponents = [...components];
  //   const [movedComponent] = newComponents.splice(fromIndex, 1);
  //   newComponents.splice(toIndex, 0, movedComponent);
  //   setComponents(newComponents);
  // };
  // return (
  //   <div className="cv-layout-container">
  //     <DndProvider backend={HTML5Backend}>
  //       <div>
  //         {components.map((component, index) => (
  //           <DraggableItem key={component.key} index={index} moveItem={moveItem}>
  //             {component}
  //           </DraggableItem>
  //         ))}
  //       </div>
  //     </DndProvider>
  //   </div>
  // );

  const [components, setComponents] = useState(children);

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const handleDragStart = useCallback(event => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(event => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = components.indexOf(active.id);
      const newIndex = components.indexOf(over.id);
      const newComponents = [...components];
      const [movedComponent] = newComponents.splice(oldIndex, 1);
      newComponents.splice(newIndex, 0, movedComponent);
      setComponents(newComponents);
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <div className="cv-layout-container">
      <DndContext sensors={sensors} onDragCancel={handleDragCancel} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={components} strategy={verticalListSortingStrategy}>
          {components.map((child, index) => (
            <div key={index}>
              <SortableItem key={index}>{child}</SortableItem>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CVLayout;
