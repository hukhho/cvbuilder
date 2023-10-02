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
      return <Typography.Title level={5}>{titleProps}</Typography.Title>;
    }

    switch (templateType) {
      case 'classical':
        return (
          <div>
            <div className="item-title">
              <Typography.Title level={4}>{role}</Typography.Title>
            </div>
            <div className="item-sub-title">
              {orgName && (
                <div className="left-sub-title">
                  <Typography.Title level={5}>{orgName}</Typography.Title>
                </div>
              )}
              {startTime && (
                <div className="right-sub-title">
                  <Typography.Title level={5}>{dateRangeFormat()}</Typography.Title>
                  {location && (
                    <Typography.Title className="time" level={5}>
                      , {location}
                    </Typography.Title>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 'modern':
        return (
          <div className="item-title">
            <Typography.Title className="role" level={4}>
              {role}
            </Typography.Title>
            <Typography.Title level={4}>|| {orgName}</Typography.Title>
            {location && (
              <Typography.Title className="location" level={4}>
                || {location}
              </Typography.Title>
            )}
            {startTime && (
              <Typography.Title className="time" level={4}>
                || {dateRangeFormat()}
              </Typography.Title>
            )}
          </div>
        );
      case 'modern-2':
        return (
          <>
            <div style={{ display: 'flex' }} className="item-title">
              <Typography.Title className="role" level={4}>
                {role}
              </Typography.Title>
              {orgName && (
                <Typography.Title className="org" level={4}>
                  || {orgName}
                </Typography.Title>
              )}
            </div>
            <div className="item-sub-title">
              {startTime && (
                <div className="left-sub-title">
                  <Typography.Title level={5}>{dateRangeFormat()}</Typography.Title>
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
