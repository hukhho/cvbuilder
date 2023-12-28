/* eslint-disable */

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
import StandardItemV2 from '../StandardItemV2';

const SkillsSection = ({
  skills,
  onChangeOrder,
  templateType,
  canBeDisplayed,
  highlightAts,
  onComment,
  onDeleteComment,
  isShowCommentBox = true,
}) => {
  const skillItems = (
    <>
      {skills.map(edu => {
        const { description } = edu;
        return (
          <StandardItemV2
            isShowCommentBox={isShowCommentBox}
            onComment={onComment}
            type="skill"
            dataId={edu.id}
            onDeleteComment={onDeleteComment}
            highlightAts={highlightAts}
            key={edu.id}
            titleProps={description}
            templateType={templateType}
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

  if (!canBeDisplayed) {
    return <></>;
  }
  return (
    <div className="skill leading-snug relative group ">
      <div
        className="uppercase mb-[4px]"
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio"
          id="skill-heading"
          contentEditable="true"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          Skills
        </span>
        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />
      </div>
      {/* <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
        <hr />
      </div>{' '} */}
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

export default SkillsSection;
