'use client';

import { Divider, Typography } from 'antd';
import { useCallback, useState } from 'react';
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

const ExperiencesSection = ({ experiences, onChangeOrder, templateType }) => {
  console.log('ExperiencesSection::: ', experiences);
  const experienceItems = (
    <>
      {experiences.map(exp => {
        const { startDate, endDate, description, companyName, role, location } = exp;
        return (
          <>
            <StandardItem
              key={exp.id}
              templateType={templateType}
              role={role}
              location={location}
              startTime={startDate}
              endTime={endDate}
              orgName={companyName}
              renderRightSubtitle
              description={description}
            />
          </>
        );
      })}
    </>
  );
  const { children } = experienceItems.props;
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
        const sortedExperienceItems = sortItemsOrderBasedOnKeys(arrKeys, experiences);
        onChangeOrder(sortedExperienceItems);
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
    <div className="experience leading-snug relative group">
      <div
        className="uppercase"
        style={{
          marginBottom: '4px',
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio "
          id="experience-heading"
          tabIndex={0}
          contentEditable="true"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          Experience
        </span>
        <div>
          <hr
            style={{
              border: 'none',
              height: '0.12em',
              backgroundColor: '#000',
              width: '100%', // Adjust the width as needed
              margin: '1px', // Adjust the margin as needed
            }}
          />
        </div>
        {/* <div className='section-header'></div> */}
      </div>

      {/* <Divider className="section-header" /> */}
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
export default ExperiencesSection;
