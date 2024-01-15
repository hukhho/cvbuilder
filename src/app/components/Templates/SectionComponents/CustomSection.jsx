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
import he from 'he';
import StandardItemV2 from '../StandardItemV2';

const CustomSections = ({
  experiences,
  customSectionTitle,
  onChangeOrder,
  templateType,
  highlightAts = [],
  type = 'customSection',
  isEnableAts = false,
  isEditable = false,
  isReviewComment = false,
  isShowCommentBox = false,
  onComment,
  onDeleteComment,
  handleRoleChange,
  handleOrgNameChange,
  handleDescriptionChange,
}) => {
  console.log('CustomSections:customSectionTitle::: ', customSectionTitle);

  const mockDes = 'This is some text with encoded parentheses: (Hello) ';
  const mockDes2 =
    'Increased the firms technology risk oversight by 60 with the development and integration of new infrastructure scanners into the risk reporting engine C  TSQL. \n Automated 75 of the manual QA testing by developing a new UI test tool for the risk dashboard Python, Selenium. Improved satisfaction rating by 50 by building documentation and training for the risk dashboard.';
  const experienceItems = (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {experiences &&
        experiences.map(exp => {
          const { duration, description, subTitle, title, location } = exp;
          // Decode HTML entities
          // const decodedString = he.encode(description).trim();
          if (isReviewComment) {
            return (
              <StandardItemV2
                isDnd={false}
                isShowCommentBox={isShowCommentBox}
                onComment={onComment}
                onDeleteComment={onDeleteComment}
                key={exp.id}
                dataId={exp.id}
                type={type}
                templateType={templateType}
                role={title}
                handleRoleChange={handleRoleChange}
                handleOrgNameChange={handleOrgNameChange}
                handleDescriptionChange={handleDescriptionChange}
                location={location}
                duration={duration}
                orgName={subTitle}
                renderRightSubtitle
                description={description}
              />
            );
          }
          return (
            <StandardItem
              highlightAts={highlightAts}
              type={type}
              typeId={exp.id}
              key={exp.id}
              templateType={templateType}
              role={title}
              location={location}
              duration={duration}
              orgName={subTitle}
              renderRightSubtitle
              description={description}
              isEditable={isEditable}
              isEnableAts={isEnableAts}
              handleRoleChange={handleRoleChange}
              handleOrgNameChange={handleOrgNameChange}
              handleDescriptionChange={handleDescriptionChange}
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
          {customSectionTitle || 'Custom Sections'}
        </span>
        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />

        <div />
        {/* <div className='section-header'></div> */}
      </div>

      {/* <Divider className="section-header" /> */}
      <div>
        {components && (
          <DndContext
            sensors={sensors}
            onDragCancel={handleDragCancel}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={components}>
              {components &&
                components.map((child, index) => (
                  <div key={index}>
                    <SortableItem className="hello" key={index}>
                      {child}
                    </SortableItem>
                  </div>
                ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};
export default CustomSections;
