'use client';

import { Divider, Typography } from 'antd';
import './CVTemplates.scss';
import { useCallback, useState } from 'react';
import StandardItem from './StandardItem';
import DraggableItem from '../DraggableItem';
import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../SortableList/SortableItem';

const ExperiencesSection = ({ experiences }) => {
  const experienceItems = (
    <>
      {experiences.map(exp => {
        const { startDate, endDate, description, companyName, role, location } = exp;
        return (
          <StandardItem
            key={exp.id}
            title={role}
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

  const handleDragEnd = useCallback(event => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = components.indexOf(active.id);
      const newIndex = components.indexOf(over.id);
      const newcomponents = [...components];
      const [movedComponent] = newcomponents.splice(oldIndex, 1);
      newcomponents.splice(newIndex, 0, movedComponent);
      setComponents(newcomponents);
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <div className="experiences-section-container">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Experiences
        </Typography.Title>
        <Divider />
        <div className="experience-components">
          <DndContext sensors={sensors} onDragCancel={handleDragCancel} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
    </div>
  );
};
export default ExperiencesSection;
