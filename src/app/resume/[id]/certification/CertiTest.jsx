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

const CertiTest = ({ skills, onChangeOrder }) => {
 
  const skillItems = (
    <>
      {skills.map(edu => {
        const { description } = edu;
        return <div key={edu?.id}>{description}</div>;
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
        console.log("sortedskillItems", sortedskillItems)
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
                <SortableItem className="hello" key={index}>
                  {child}
                </SortableItem>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
  );
};

export default CertiTest;
