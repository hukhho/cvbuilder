'use client';

import { useCallback, useState } from 'react';
import { Divider, Radio, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
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

const SkillsSection = ({ skills, onChangeOrder, templateType }) => {
  const skillItems = (
    <>
      {skills.map(edu => {
        const { name } = edu;
        return <StandardItem key={edu.id} titleProps={name} templateType={templateType} />;
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
        const sortedskillItems = sortItemsOrderBasedOnKeys(arrKeys, skills);
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
    <div className="skills-section-container mb-4">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Skills
        </Typography.Title>
      </div>
      <Divider className="divider-section" />
      <div className="skill-items">
        <DndContext
          sensors={sensors}
          onDragCancel={handleDragCancel}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={components}>
            {components.map((child, index) => (
              <div key={index}>
                <SortableItem key={index}>{child}</SortableItem>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default SkillsSection;
