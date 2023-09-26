import { Divider, Radio, Typography } from 'antd';
import './CVTemplates.scss';
import Paragraph from 'antd/es/typography/Paragraph';

const SkillsSection = ({ skills }) => {
  return (
    <div className="skills-section-container">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Skills
        </Typography.Title>
        <Divider />
        <div className="skill-items">
          <Paragraph />
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
