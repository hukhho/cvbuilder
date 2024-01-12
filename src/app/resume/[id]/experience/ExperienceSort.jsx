/* eslint-disable */

'use client';

import { useCallback, useState } from 'react';
import { Divider, Radio, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
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
import { sortItemsOrderBasedOnKeysV1 } from '../../sortItemsOrder';
import SortableItem from '@/app/components/SortableList/SortableItem';
import StandarList from '@/app/components/List/StandarList';
import SortableItemCV from '@/app/components/SortableList/SortableItemCV';
import StandarListV2 from '@/app/components/List/StandarListV2';

const ExperienceSort = ({
  skills,
  onChangeOrder,
  selectedExperience,
  updateExperience,
  handleDeleteData,
  handleEditData,
  cvId,
  config
}) => {
  const skillItems = (
    <>
      {skills.map(edu => {
        const { description } = edu;
        return (
          <StandarListV2
            key={edu.id}
            data={edu}
            selectedExperience={selectedExperience}
            cvId={cvId}
            onDelete={handleDeleteData}
            onEdit={handleEditData}
            // title={edu.role}
            // subtitle={edu.companyName}
            updateExperience={updateExperience}
            config={config}
          />
        );
      })}
    </>
  );
  const { children } = skillItems.props;
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
        const sortedskillItems = sortItemsOrderBasedOnKeysV1(arrKeys, skills);
        onChangeOrder(sortedskillItems);
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
              <SortableItemCV className="hello" key={index}>
                {child}
              </SortableItemCV>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
export default ExperienceSort;
