import { Divider, Typography } from 'antd';
import './CVTemplates.scss';

const SummarySection = ({ summary }) => {
  return (
    <div className="summary-section-container">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Summary
        </Typography.Title>
        <Divider />
      </div>
    </div>
  );
};

export default SummarySection;
