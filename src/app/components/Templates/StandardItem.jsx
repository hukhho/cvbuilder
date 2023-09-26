'use client';

import { Typography } from 'antd';

const StandardItem = ({ title, startTime = null, endTime = null, description = null, location = null, renderRightSubtitle = false, orgName = null }) => {
  const buildRightSubTitle = () => {
    let rightSubitle = '';
    if (startTime && endTime) {
      rightSubitle = `${startTime} - ${endTime}`;
    } else if (!startTime && endTime) {
      rightSubitle = endTime;
    } else if (startTime && !endTime) {
      rightSubitle = `${startTime} - Now`;
    }

    if (rightSubitle.length > 0 && location) {
      rightSubitle.concat(`, ${location}`);
    }
    return rightSubitle;
  };

  return (
    <div className="standard-item">
      <div className="item-title">
        <Typography.Title level={4}>{title}</Typography.Title>
      </div>
      <div className="item-sub-title">
        <div className="left-sub-title">{orgName}</div>
        {renderRightSubtitle && <div className="right-sub-title">{buildRightSubTitle()}</div>}
      </div>
      <div className="item-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StandardItem;
