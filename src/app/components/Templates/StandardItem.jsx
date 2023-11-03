'use client';

import { Divider, Typography } from 'antd';

//    
  //   _     _                   _                                    
  //   _ __ | |__ (_)_ __     ___ __ _(_)   ___ ___  _ __     ___ __ _  ___ 
  //  | '_ \| '_ \| | '_ \   / __/ _` | |  / __/ _ \| '_ \   / __/ _` |/ __|
  //  | | | | | | | | | | | | (_| (_| | | | (_| (_) | | | | | (_| (_| | (__ 
  //  |_| |_|_| |_|_|_| |_|  \___\__,_|_|  \___\___/|_| |_|  \___\__,_|\___|

const StandardItem = props => {
  const { role, orgName, startTime, endTime, description, location, templateType, titleProps } =
    props;

  const dateRangeFormat = () => {
    let dateRange = startTime || null;
    // if (dateRange === null) return null;
    // if (endTime) {
    //   dateRange = dateRange.concat(` - ${endTime}`);
    // } else {
    //   dateRange = dateRange.concat(' - Present');
    // }

    return dateRange;
  };

  const renderTitle = () => {
    if (titleProps) {
      return (<div
        className="XHKKXx5eVL leading-snug relative group "
        style={{ paddingLeft: "1.4cm", paddingRight: "1.4cm" }}
      >
        <i
          className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
          aria-hidden="true"
        />
        <div
          className="relative whitespace-pre-line"
          style={{ color: "rgb(46, 61, 80)", fontWeight: 700, fontSize: "0.85em" }}
        >
          <div className="relative">
            {/* <p className="editableContent ghost-hightlight w-full designStudio ">
              <span>
                <span className="">{titleProps}</span>
              </span>
            </p> */}
          </div>
          <p
            className="editableContent cursor-text  designStudio  "
            id="XHKKXx5eVL-skill"
            tabIndex={0}
            contentEditable="true"
          >
            {titleProps}
          </p>
        </div>
      </div>
      );
    }

    switch (templateType) {
      case 'classical':
        return (
          <div className="leading-snug relative group">
            <div className="flex flex-col" style={{ lineHeight: '1.6em' }}>
              <ul className="sortable-container ">
                <li
                  className="smpl125032021 leading-snug relative group"
                  style={
                    {
                      paddingLeft: '1.4cm',
                      paddingRight: '1.4cm',
                      marginBottom: 11,
                    }
                  }
                >
                  <i
                    className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                    aria-hidden="true"
                  />
                  <div className="" style={{ lineHeight: '1em' }}>
                    <div className="flex gap-2">
                      <span className="text-[#000000]" style={{ color: 'rgb(0, 0, 0)' }}>
                        <div
                          className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                          style={{ color: 'rgb(0, 0, 0)' }}
                        >
                          <span
                            className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                            id="smpl125032021-role"
                            tabIndex={0}
                            contentEditable="true"
                          >
                            {role}
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className="flex gap-2 justify-between font-semibold">
                      <div style={{ color: 'rgb(46, 61, 80)' }}>
                        <span
                          className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                          style={{ fontSize: '0.85em' }}
                        >
                          <span
                            className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                            id="smpl125032021-company"
                            tabIndex={0}
                            contentEditable="true"
                            style={{
                              display: 'inline',
                              verticalAlign: 'initial',
                            }}
                          >
                            {orgName}
                          </span>
                        </span>
                      </div>
                      <div style={{ color: 'rgb(46, 61, 80)' }}>
                        <div
                          className="inline-block before:first:hidden before:absolute"
                          style={{ fontSize: '0.85em' }}
                        >
                          <span
                            className="editableContent cursor-text leading-snug ml-0 designStudio "
                            id="smpl125032021-duration"
                            tabIndex={0}
                            contentEditable="true"
                          >
                            {dateRangeFormat()}
                          </span>
                        </div>
                        <div
                          className="inline-block before:first:hidden before:absolute before:content-[',_']"
                          style={{ fontSize: '0.85em' }}
                        >
                          <span
                            className="editableContent cursor-text leading-snug ml-2 designStudio "
                            id="smpl125032021-location"
                            tabIndex={0}
                            contentEditable="true"
                          >
                            {location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-[0.85em] relative whitespace-pre-line "
                    style={{
                      color: 'rgb(46, 61, 80)',
                      lineHeight: '1.6em',
                      fontSize: '0.85em',
                      fontWeight: 100,
                    }}
                  >
                    <div className="relative">
                      <p className="editableContent ghost-hightlight w-full designStudio ">
                        <span>
                          <span className="">• cc</span>
                        </span>
                      </p>
                    </div>
                    <p
                      className="editableContent cursor-text  designStudio "
                      id="smpl125032021-description"
                      tabIndex={0}
                      contentEditable="true"
                    >
                      {description}
                    </p>
                  </div>
                </li>
              </ul>
              <div id="DndDescribedBy-2" style={{ display: 'none' }}>
                To pick up a draggable item, press the space bar. While dragging, use the arrow keys
                to move the item. Press space again to drop the item in its new position, or press
                escape to cancel.
              </div>
              <div
                id="DndLiveRegion-1"
                role="status"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                  position: 'fixed',
                  width: 1,
                  height: 1,
                  margin: '-1px',
                  border: 0,
                  padding: 0,
                  overflow: 'hidden',
                  clip: 'rect(0px, 0px, 0px, 0px)',
                  clipPath: 'inset(100%)',
                  whiteSpace: 'nowrap',
                }}
              />
            </div>
          </div>
        );
      case 'modern':
        return (
          <>
            <div className="item-title">
              <span className="role">{role}</span>
              <span>|| {orgName}</span>
              {location && <span className="location">|| {location}</span>}
              {startTime && <span className="time">|| {dateRangeFormat()}</span>}
            </div>
            {description && (
              <div className="item-description">
                <span>{description}</span>
              </div>
            )}
          </>
        );
      case 'modern-2':
        return (
          <>
            <div style={{ display: 'flex' }} className="item-title">
              <span className="role">{role}</span>
              {orgName && <span className="org">|| {orgName}</span>}
            </div>
            <div className="item-sub-title">
              {startTime && (
                <div className="left-sub-title">
                  <span>{dateRangeFormat()}</span>
                </div>
              )}
            </div>
            {description && (
              <div className="item-description">
                <span>{description}</span>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderTitle()} </>;
};

export default StandardItem;
