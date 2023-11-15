/* eslint-disable */

'use client';

import { Divider, Typography } from 'antd';
import { useCallback, useState } from 'react';
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
import StandardItemReviewers from '../StandardItemReviewer';

const ExperiencesSection = ({ experiences, onChangeOrder, onComment, templateType }) => {
  console.log('ExperiencesSection::: ', experiences);
  console.log('experience section:::onComment ', onComment);
  const experienceItems = (
    <>
      {experiences.map(exp => {
        const { startDate, endDate, description, companyName, role, location } = exp;
        return (
          <StandardItemReviewers
            onComment={onComment}
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
    <div className="experience leading-snug relative group ">
      <div
        className="uppercase mb-[4px]   "
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio section-header"
          id="experience-heading"
          contentEditable="true"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          Experience
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
export default ExperiencesSection;
