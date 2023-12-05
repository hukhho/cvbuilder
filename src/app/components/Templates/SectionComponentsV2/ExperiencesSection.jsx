/* eslint-disable */
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
import StandardItemV2 from '../StandardItemV2';

const ExperiencesSection = ({
  onComment,
  onDeleteComment,
  experiences,
  onChangeOrder,
  templateType,
  handleRoleChange,
  handleOrgNameChange,
  handleDescriptionChange,
}) => {
  console.log('ExperiencesSection::: ', experiences);
  const experienceItems = (
    <>
      {experiences.map(exp => {
        const { duration, description, companyName, role, location } = exp;
        return (
          <StandardItemV2
            onComment={onComment}
            onDeleteComment={onDeleteComment}
            key={exp.id}
            dataId={exp.id}
            type="experience"
            templateType={templateType}
            role={role}
            handleRoleChange={handleRoleChange}
            handleOrgNameChange={handleOrgNameChange}
            handleDescriptionChange={handleDescriptionChange}
            location={location}
            duration={duration}
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
    <div className="experience leading-snug relative group">
      <div
        className="uppercase mb-[4px]   "
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio "
          id="experience-heading"
          // contentEditable="true"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          Experience
        </span>
        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />

        <div />
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
