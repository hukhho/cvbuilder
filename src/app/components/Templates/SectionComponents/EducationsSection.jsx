'use client';

import { useCallback, useState } from 'react';
import { Divider, Typography } from 'antd';

import StandardItem from '../StandardItem';
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
import SortableItem from '../../SortableList/SortableItem';
import { sortItemsOrderBasedOnKeys } from '../sortItemsOrder';

const EducationsSection = ({ educations, onChangeOrder, templateType, layoutStyles }) => {
  console.log(
    '🚀 ~ file: EducationsSection.jsx:26 ~ EducationsSection ~ layoutStyles:',
    layoutStyles,
  );
  const educationItems = (
    <>
      {educations.map(edu => {
        const { startDate, endDate, description, degree, collegeName, location, gpa } = edu;
        return (
          <StandardItem
            key={edu.id}
            role={degree}
            location={location}
            startTime={startDate}
            endTime={endDate}
            orgName={collegeName}
            description={description}
            templateType={templateType}
          />
        );
      })}
    </>
  );
  const { children } = educationItems.props;
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
        const arrKeys = newComponents.map(it => it.key);
        const sortededucationItems = sortItemsOrderBasedOnKeys(arrKeys, educations);
        onChangeOrder(sortededucationItems);
        setComponents([...newComponents]);
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
      className="education relative group"
      style={{ zoom: layoutStyles.zoom, lineHeight: `${layoutStyles.lineHeight} !important` }}
    >
      <div
        className="uppercase mb-[4px]   "
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
        }}
      >
        <span
          className={`editableContent cursor-text designStudio ${
            templateType === 'classical' ? 'section-header' : ''
          }`}
          id="education-heading"
          contentEditable="true"
          style={{
            fontSize: '1.15em',
            display: 'block',
            color: layoutStyles.fontColor,
          }}
        >
          Education
        </span>
      </div>
      {/* <Divider className="divider-section" /> */}
      <div>
        <DndContext
          sensors={sensors}
          onDragCancel={handleDragCancel}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={components}>
            {components.map((child, index) => (
              <div key={index}>
                <SortableItem className="hello" key={index}>
                  {child}
                </SortableItem>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default EducationsSection;
