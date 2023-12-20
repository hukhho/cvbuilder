/* eslint-disable no-shadow */

'use client';

import { useCallback, useEffect, useState } from 'react';
import './CVTemplates.scss';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from '../SortableList/SortableItem';
import { Divider } from 'antd';

const CVLayout = ({ children, onSectionsOrderChange, layoutStyles }) => {
  const { zoom, paperSize, hasIndent, hasDivider, ...restLayoutStyles } = layoutStyles;
  const CvStyles = {
    ...restLayoutStyles,
    color: layoutStyles.fontColor,
    width: layoutStyles.paperSize === 'A4' ? '210mm' : '8.5in',
    fontFamily: `${layoutStyles.fontFamily}, serif`,
    backgroundColor: 'white',
  };

  useEffect(() => {
    const resumeId = document.getElementById('resume');
    resumeId?.style.setProperty('--text-indent', hasIndent ? '1em' : '0em');
  }, [hasIndent]);

  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ['Source Sans Pro'],
  //     },
  //   });
  // }, []);

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

  const handleDragEnd = useCallback(
    event => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = components.indexOf(active.id);
        const newIndex = components.indexOf(over.id);
        const newComponents = arrayMove(components, oldIndex, newIndex);
        setComponents([...newComponents]);
        onSectionsOrderChange(newComponents);
      }

      setActiveId(null);
    },
    [components],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <div
      style={{
        minHeight: layoutStyles.paperSize === 'A4' ? '297mm' : '11in',
        zoom: layoutStyles.zoom,
        size: layoutStyles.paperSize,
      }}
    >
      <div id="resume" className="cv-layout-container" style={CvStyles}>
        <DndContext
          sensors={sensors}
          onDragCancel={handleDragCancel}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={components} strategy={verticalListSortingStrategy}>
            {components.map((child, index) => (
              <div key={index}>
                {child.props.canBeDrag === false ? ( // Check if the section can be dragged
                  <div key={index}>
                    {child}
                    {layoutStyles.hasDivider && (
                      <Divider
                        style={{
                          margin: '0px 0px 10px 0px',
                        }}
                      />
                    )}
                  </div> // Render without drag if canBeDrag is false
                ) : (
                  <div key={index}>
                    <SortableItem key={index}>{child}</SortableItem>
                    {index < components.length - 1 && layoutStyles.hasDivider && (
                      <Divider
                        style={{
                          margin: '10px 0px',
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default CVLayout;
