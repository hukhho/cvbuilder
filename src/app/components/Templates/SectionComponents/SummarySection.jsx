import { Divider, Typography } from 'antd';

const SummarySection = ({ summary }) => {
  return (
    <div className="summary-section-container mb-4">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Summary
        </Typography.Title>
      </div>
      <Divider className="divider-section" />
      <div className="summary-content">
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default SummarySection;
