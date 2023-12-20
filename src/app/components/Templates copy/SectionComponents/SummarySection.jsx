import { Divider, Typography } from 'antd';

const SummarySection = ({ summary }) => {
  return (
    <div className="summary-section-container mb-4">
      <div className="title">
        <span style={{ margin: 0 }}>Summary</span>
      </div>
      <Divider className="divider-section" />
      <div className="summary-content">
        <span>{summary}</span>
      </div>
    </div>
  );
};

export default SummarySection;
