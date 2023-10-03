'use client';

import { Divider, Typography } from 'antd';

const StandardItem = props => {
  const { role, orgName, startTime, endTime, description, location, templateType, titleProps } =
    props;

  const dateRangeFormat = () => {
    let dateRange = startTime || null;
    if (dateRange === null) return null;
    if (endTime) {
      dateRange = dateRange.concat(` - ${endTime}`);
    } else {
      dateRange = dateRange.concat(' - Present');
    }
    return dateRange;
  };

  const renderTitle = () => {
    if (titleProps) {
      return <span className="item-sub-title">{titleProps}</span>;
    }

    switch (templateType) {
      case 'classical':
        return (
          <div>
            <div className="item-title">
              <span>{role}</span>
            </div>
            <div className="item-sub-title">
              {orgName && (
                <div className="left-sub-title">
                  <span>{orgName}</span>
                </div>
              )}
              {startTime && (
                <div className="right-sub-title">
                  <span>{dateRangeFormat()}</span>
                  {location && (
                    <span className="time" level={5}>
                      , {location}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 'modern':
        return (
          <div className="item-title">
            <span className="role">{role}</span>
            <span>|| {orgName}</span>
            {location && <span className="location">|| {location}</span>}
            {startTime && <span className="time">|| {dateRangeFormat()}</span>}
          </div>
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="standard-item mb-4">
      {renderTitle()}
      {description && (
        <div className="item-description">
          <span>{description}</span>
        </div>
      )}
    </div>
  );
};

export default StandardItem;
