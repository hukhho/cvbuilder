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

const CertificationSection = ({ certifications, onChangeOrder, templateType }) => {
  const educationItems = (
    <>
      {certifications.map(edu => {
        const { name, certificateSource, endYear, certificateRelevance } = edu;
        return (
          <StandardItem
            key={edu.id}
            role={name}
            firstItem={certificateSource}
            secondItem={endYear}
            threeItem={null}
            fourItem={null}
            fiveItem={null}
            description={certificateRelevance}
            templateType={templateType}
            isThreeLine
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
        const sortededucationItems = sortItemsOrderBasedOnKeys(arrKeys, certifications);
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
    <div className="project leading-snug relative group ">
      <div
        className="uppercase mb-[4px]   "
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio"
          id="education-heading"
          contentEditable="true"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          CERTIFICATIONS
        </span>
        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />
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

export default CertificationSection;
