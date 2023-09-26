import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from '../DraggableItem';
import './CVTemplates.scss';

const CVLayout = ({ children }) => {
  const [components, setComponents] = useState(children);

  const moveItem = (fromIndex, toIndex) => {
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, movedComponent);
    setComponents(newComponents);
  };

  return (
    <div className="cv-layout-container">
      <DndProvider backend={HTML5Backend}>
        <div>
          {components.map((component, index) => (
            <DraggableItem key={index} index={index} moveItem={moveItem}>
              {component}
            </DraggableItem>
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default CVLayout;
